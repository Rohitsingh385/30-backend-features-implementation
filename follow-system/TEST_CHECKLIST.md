# Follow System — Comprehensive Test Checklist

> Base URL: `http://localhost:3000/api/v1`
> Auth header: `Authorization: Bearer <token>`

---

## ⚠️ Known Issues Found During Review (Fix Before Testing)

| # | File | Issue |
|---|------|-------|
| 1 | `user.controller.ts` | `import { jwt } from "jsonwebtoken"` → should be `import jwt from "jsonwebtoken"` |
| 2 | `user.controller.ts` | `signUpModel.find({ email })` returns an array, never falsy — duplicate check always passes |
| 3 | `user.controller.ts` | `login()` accesses `user.email`, `user._id`, `user.name` on an array — should use `findOne()` |
| 4 | `user.controller.ts` | `signup()` has no `try/catch` — unhandled rejections crash the server |
| 5 | `user.controller.ts` | Password stored in plain text — must hash with `bcrypt` before saving |
| 6 | `auth.middleware.ts` | File is empty — JWT verification middleware not implemented |
| 7 | `follow.model.ts` | File is empty — Follow schema not defined |
| 8 | `follow.controller.ts` | File is empty — all follow logic missing |
| 9 | `follow.route.ts` | File is empty — follow routes not registered |
| 10 | `index.ts` | Follow router not mounted in the Express app |
| 11 | `user.validation.ts` | `z.email()` → should be `z.string().email()` (Zod v4 syntax) |

---

## 1. Authentication Tests

### TC-AUTH-01 — Signup success

- **Preconditions:** No user with `test@example.com` exists
- **Request:**
  ```
  POST /api/v1/signup
  Body: { "name": "Test User", "email": "test@example.com", "password": "secret123" }
  ```
- **Expected status:** `201`
- **Expected response:**
  ```json
  {
    "message": "user registered",
    "token": "<jwt_string>",
    "user": { "id": "<objectId>", "name": "Test User", "email": "test@example.com" }
  }
  ```
- **Expected DB state:** One document in `users` collection with `email: "test@example.com"`, password stored as bcrypt hash (not plain text)

---

### TC-AUTH-02 — Signup with duplicate email

- **Preconditions:** User with `test@example.com` already exists
- **Request:**
  ```
  POST /api/v1/signup
  Body: { "name": "Another User", "email": "test@example.com", "password": "secret123" }
  ```
- **Expected status:** `409`
- **Expected response:** `{ "message": "user already exists" }`
- **Expected DB state:** Still exactly one user with that email (no duplicate created)

---

### TC-AUTH-03 — Signup with name too short

- **Preconditions:** None
- **Request:**
  ```
  POST /api/v1/signup
  Body: { "name": "AB", "email": "new@example.com", "password": "secret123" }
  ```
- **Expected status:** `400`
- **Expected response:** Validation error referencing `name` field
- **Expected DB state:** No new user created

---

### TC-AUTH-04 — Signup with password too short

- **Preconditions:** None
- **Request:**
  ```
  POST /api/v1/signup
  Body: { "name": "Valid Name", "email": "new@example.com", "password": "abc" }
  ```
- **Expected status:** `400`
- **Expected response:** Validation error referencing `password` field
- **Expected DB state:** No new user created

---

### TC-AUTH-05 — Signup with invalid email format

- **Preconditions:** None
- **Request:**
  ```
  POST /api/v1/signup
  Body: { "name": "Valid Name", "email": "not-an-email", "password": "secret123" }
  ```
- **Expected status:** `400`
- **Expected response:** Validation error referencing `email` field
- **Expected DB state:** No new user created

---

### TC-AUTH-06 — Signin success

- **Preconditions:** User `test@example.com` / `secret123` exists
- **Request:**
  ```
  POST /api/v1/signin
  Body: { "email": "test@example.com", "password": "secret123" }
  ```
- **Expected status:** `200`
- **Expected response:**
  ```json
  {
    "message": "login successful",
    "token": "<jwt_string>",
    "user": { "id": "<objectId>", "name": "Test User", "email": "test@example.com" }
  }
  ```
- **Expected DB state:** Unchanged

---

### TC-AUTH-07 — Signin with wrong password

- **Preconditions:** User `test@example.com` exists
- **Request:**
  ```
  POST /api/v1/signin
  Body: { "email": "test@example.com", "password": "wrongpass" }
  ```
- **Expected status:** `401`
- **Expected response:** `{ "message": "invalid credentials" }`
- **Expected DB state:** Unchanged

---

### TC-AUTH-08 — Signin with non-existent email

- **Preconditions:** `ghost@example.com` does not exist
- **Request:**
  ```
  POST /api/v1/signin
  Body: { "email": "ghost@example.com", "password": "secret123" }
  ```
- **Expected status:** `401`
- **Expected response:** `{ "message": "invalid credentials" }`
- **Expected DB state:** Unchanged

---

### TC-AUTH-09 — Request to protected endpoint with no token

- **Preconditions:** None
- **Request:**
  ```
  POST /api/v1/users/<validId>/follow
  Headers: (no Authorization header)
  ```
- **Expected status:** `401`
- **Expected response:** `{ "message": "unauthorized" }` or similar
- **Expected DB state:** No follow document created

---

### TC-AUTH-10 — Request to protected endpoint with malformed token

- **Preconditions:** None
- **Request:**
  ```
  POST /api/v1/users/<validId>/follow
  Headers: Authorization: Bearer this.is.not.valid
  ```
- **Expected status:** `401`
- **Expected response:** Token verification error message
- **Expected DB state:** No follow document created

---

### TC-AUTH-11 — Request to protected endpoint with expired token

- **Preconditions:** Have a token that was signed with `expiresIn: '0s'` or wait 1h
- **Request:**
  ```
  POST /api/v1/users/<validId>/follow
  Headers: Authorization: Bearer <expired_token>
  ```
- **Expected status:** `401`
- **Expected response:** `{ "message": "token expired" }` or similar
- **Expected DB state:** No follow document created

---

## 2. Follow User Tests

### TC-FOLLOW-01 — Follow a user successfully

- **Preconditions:** UserA and UserB exist; UserA is authenticated; no existing follow relationship
- **Request:**
  ```
  POST /api/v1/users/<UserB_id>/follow
  Headers: Authorization: Bearer <UserA_token>
  ```
- **Expected status:** `200` or `201`
- **Expected response:** `{ "message": "followed successfully" }`
- **Expected DB state:** One document `{ follower: UserA._id, following: UserB._id }` in `follows` collection

---

### TC-FOLLOW-02 — Cannot follow yourself

- **Preconditions:** UserA is authenticated
- **Request:**
  ```
  POST /api/v1/users/<UserA_id>/follow
  Headers: Authorization: Bearer <UserA_token>
  ```
- **Expected status:** `400`
- **Expected response:** `{ "message": "cannot follow yourself" }` or similar
- **Expected DB state:** No follow document created

---

### TC-FOLLOW-03 — Cannot follow a non-existent user

- **Preconditions:** UserA is authenticated; target ID is a valid ObjectId that has no matching user
- **Request:**
  ```
  POST /api/v1/users/000000000000000000000001/follow
  Headers: Authorization: Bearer <UserA_token>
  ```
- **Expected status:** `404`
- **Expected response:** `{ "message": "user not found" }`
- **Expected DB state:** No follow document created

---

### TC-FOLLOW-04 — Cannot follow the same user twice

- **Preconditions:** UserA already follows UserB
- **Request:**
  ```
  POST /api/v1/users/<UserB_id>/follow
  Headers: Authorization: Bearer <UserA_token>
  ```
- **Expected status:** `409`
- **Expected response:** `{ "message": "already following" }` or similar
- **Expected DB state:** Still only one follow document between UserA → UserB

---

### TC-FOLLOW-05 — Invalid ObjectId in route param

- **Preconditions:** UserA is authenticated
- **Request:**
  ```
  POST /api/v1/users/not-an-objectid/follow
  Headers: Authorization: Bearer <UserA_token>
  ```
- **Expected status:** `400`
- **Expected response:** `{ "message": "invalid user id" }` or similar
- **Expected DB state:** No follow document created

---

### TC-FOLLOW-06 — Multiple users following the same user

- **Preconditions:** UserA, UserB, UserC exist; none currently follow UserD
- **Requests (sequential):**
  ```
  POST /api/v1/users/<UserD_id>/follow  (token: UserA)
  POST /api/v1/users/<UserD_id>/follow  (token: UserB)
  POST /api/v1/users/<UserD_id>/follow  (token: UserC)
  ```
- **Expected status:** `200` or `201` each time
- **Expected DB state:** Three distinct follow documents all with `following: UserD._id`; UserD follower count = 3

---

## 3. Unfollow User Tests

### TC-UNFOLLOW-01 — Unfollow a user successfully

- **Preconditions:** UserA follows UserB
- **Request:**
  ```
  DELETE /api/v1/users/<UserB_id>/follow
  Headers: Authorization: Bearer <UserA_token>
  ```
- **Expected status:** `200`
- **Expected response:** `{ "message": "unfollowed successfully" }`
- **Expected DB state:** The `{ follower: UserA._id, following: UserB._id }` document is removed from `follows` collection

---

### TC-UNFOLLOW-02 — Unfollow a user not currently followed

- **Preconditions:** UserA does NOT follow UserB
- **Request:**
  ```
  DELETE /api/v1/users/<UserB_id>/follow
  Headers: Authorization: Bearer <UserA_token>
  ```
- **Expected status:** `404`
- **Expected response:** `{ "message": "not following this user" }` or similar
- **Expected DB state:** Unchanged

---

### TC-UNFOLLOW-03 — Unfollow with invalid ObjectId

- **Preconditions:** UserA is authenticated
- **Request:**
  ```
  DELETE /api/v1/users/not-an-objectid/follow
  Headers: Authorization: Bearer <UserA_token>
  ```
- **Expected status:** `400`
- **Expected response:** `{ "message": "invalid user id" }` or similar
- **Expected DB state:** Unchanged

---

### TC-UNFOLLOW-04 — Unfollow requires authentication

- **Preconditions:** None
- **Request:**
  ```
  DELETE /api/v1/users/<UserB_id>/follow
  Headers: (no Authorization)
  ```
- **Expected status:** `401`
- **Expected DB state:** Unchanged

---

## 4. Followers List Tests

### TC-FOLLOWERS-01 — Get followers of a user with no followers

- **Preconditions:** UserA exists and has zero followers
- **Request:**
  ```
  GET /api/v1/users/<UserA_id>/followers
  Headers: Authorization: Bearer <token>
  ```
- **Expected status:** `200`
- **Expected response:** `{ "followers": [] }` or `{ "data": [] }`
- **Expected DB state:** Unchanged

---

### TC-FOLLOWERS-02 — Get followers with a single follower

- **Preconditions:** UserB follows UserA
- **Request:**
  ```
  GET /api/v1/users/<UserA_id>/followers
  Headers: Authorization: Bearer <token>
  ```
- **Expected status:** `200`
- **Expected response:** Array containing one object with UserB's `id`, `name`, `email` (password must NOT be included)
- **Expected DB state:** Unchanged

---

### TC-FOLLOWERS-03 — Get followers with multiple followers

- **Preconditions:** UserB, UserC, UserD all follow UserA
- **Request:**
  ```
  GET /api/v1/users/<UserA_id>/followers
  Headers: Authorization: Bearer <token>
  ```
- **Expected status:** `200`
- **Expected response:** Array with exactly 3 items; each has `id`, `name`, `email`
- **Expected DB state:** Unchanged

---

### TC-FOLLOWERS-04 — Password field not leaked in followers list

- **Preconditions:** At least one follower exists
- **Request:**
  ```
  GET /api/v1/users/<UserA_id>/followers
  ```
- **Expected status:** `200`
- **Expected response:** Each user object must NOT contain a `password` field
- **Expected DB state:** Unchanged

---

### TC-FOLLOWERS-05 — Get followers of non-existent user

- **Preconditions:** None
- **Request:**
  ```
  GET /api/v1/users/000000000000000000000001/followers
  ```
- **Expected status:** `404`
- **Expected response:** `{ "message": "user not found" }`

---

## 5. Following List Tests

### TC-FOLLOWING-01 — Get following list of a user who follows nobody

- **Preconditions:** UserA follows nobody
- **Request:**
  ```
  GET /api/v1/users/<UserA_id>/following
  Headers: Authorization: Bearer <token>
  ```
- **Expected status:** `200`
- **Expected response:** `{ "following": [] }` or `{ "data": [] }`

---

### TC-FOLLOWING-02 — Get following list with a single entry

- **Preconditions:** UserA follows UserB
- **Request:**
  ```
  GET /api/v1/users/<UserA_id>/following
  ```
- **Expected status:** `200`
- **Expected response:** Array with one item containing UserB's `id`, `name`, `email`

---

### TC-FOLLOWING-03 — Get following list with multiple entries

- **Preconditions:** UserA follows UserB, UserC, UserD
- **Request:**
  ```
  GET /api/v1/users/<UserA_id>/following
  ```
- **Expected status:** `200`
- **Expected response:** Array with exactly 3 items

---

### TC-FOLLOWING-04 — Password field not leaked in following list

- **Preconditions:** UserA follows at least one user
- **Request:**
  ```
  GET /api/v1/users/<UserA_id>/following
  ```
- **Expected response:** No `password` field in any user object

---

### TC-FOLLOWING-05 — Following list reflects unfollow

- **Preconditions:** UserA followed UserB, then unfollowed UserB
- **Request:**
  ```
  GET /api/v1/users/<UserA_id>/following
  ```
- **Expected status:** `200`
- **Expected response:** UserB not present in the list

---

## 6. Count Endpoint Tests

### TC-COUNT-01 — Follower count for a user with no followers

- **Preconditions:** UserA has zero followers
- **Request:**
  ```
  GET /api/v1/users/<UserA_id>/followers/count
  ```
- **Expected status:** `200`
- **Expected response:** `{ "count": 0 }`

---

### TC-COUNT-02 — Following count for a user who follows nobody

- **Preconditions:** UserA follows nobody
- **Request:**
  ```
  GET /api/v1/users/<UserA_id>/following/count
  ```
- **Expected status:** `200`
- **Expected response:** `{ "count": 0 }`

---

### TC-COUNT-03 — Follower count increments after a follow

- **Preconditions:** UserA has 0 followers. Record the count.
- **Actions:**
  1. `POST /api/v1/users/<UserA_id>/follow` (token: UserB)
  2. `GET /api/v1/users/<UserA_id>/followers/count`
- **Expected status:** `200`
- **Expected response:** `{ "count": 1 }`

---

### TC-COUNT-04 — Follower count decrements after an unfollow

- **Preconditions:** UserB follows UserA (count = 1)
- **Actions:**
  1. `DELETE /api/v1/users/<UserA_id>/follow` (token: UserB)
  2. `GET /api/v1/users/<UserA_id>/followers/count`
- **Expected status:** `200`
- **Expected response:** `{ "count": 0 }`

---

### TC-COUNT-05 — Following count increments correctly

- **Preconditions:** UserA follows nobody
- **Actions:**
  1. `POST /api/v1/users/<UserB_id>/follow` (token: UserA)
  2. `POST /api/v1/users/<UserC_id>/follow` (token: UserA)
  3. `GET /api/v1/users/<UserA_id>/following/count`
- **Expected status:** `200`
- **Expected response:** `{ "count": 2 }`

---

### TC-COUNT-06 — Count endpoint with invalid ObjectId

- **Request:**
  ```
  GET /api/v1/users/bad-id/followers/count
  ```
- **Expected status:** `400`

---

### TC-COUNT-07 — Count endpoint for non-existent user

- **Request:**
  ```
  GET /api/v1/users/000000000000000000000001/followers/count
  ```
- **Expected status:** `404`

---

## 7. Database Integrity Tests

### TC-DB-01 — Compound unique index prevents duplicate follows

- **Setup:** Create follow `{ follower: A, following: B }` directly via DB or API
- **Action:** Attempt to insert same document again (via API or direct Mongoose call)
- **Expected:** MongoDB throws `E11000 duplicate key error`; API returns `409`
- **Verification:** `db.follows.countDocuments({ follower: A, following: B })` returns `1`

---

### TC-DB-02 — Unfollowing removes exactly one document

- **Preconditions:** Exactly one `{ follower: A, following: B }` document exists
- **Action:** `DELETE /api/v1/users/<B_id>/follow` (token: A)
- **Verification:** `db.follows.countDocuments({ follower: A, following: B })` returns `0`; total follows count drops by exactly 1

---

### TC-DB-03 — Follow document stores correct ObjectIds

- **Action:** UserA (id: `aaa...`) follows UserB (id: `bbb...`)
- **Verification:** Query `db.follows.findOne({ follower: ObjectId("aaa...") })` returns `{ follower: aaa..., following: bbb... }`

---

### TC-DB-04 — Deleting a user cascades follow documents (if implemented)

- **Preconditions:** UserA follows UserB; UserB has 2 followers
- **Action:** Delete UserA from the DB
- **Expected DB state:** All follow documents where `follower: UserA._id` are also removed (requires a pre-remove hook or application-level logic)

---

### TC-DB-05 — Race condition: concurrent follow requests do not create duplicates

- **Action:** Send two simultaneous `POST /users/<B_id>/follow` requests with UserA's token
- **Expected:** One succeeds with `200/201`, the other returns `409`
- **Verification:** `db.follows.countDocuments({ follower: A, following: B })` = `1`

---

## 8. Edge Cases

### TC-EDGE-01 — Follow route with missing `:id` param

- **Request:** `POST /api/v1/users//follow`
- **Expected status:** `404` (route not matched) or `400`

---

### TC-EDGE-02 — Request body with extra unexpected fields is ignored

- **Request:**
  ```
  POST /api/v1/signup
  Body: { "name": "Test", "email": "t@t.com", "password": "pass123", "role": "admin", "isAdmin": true }
  ```
- **Expected status:** `201`
- **Expected DB state:** User created without `role` or `isAdmin` fields

---

### TC-EDGE-03 — Email is lowercased on signup

- **Request:**
  ```
  POST /api/v1/signup
  Body: { "name": "Test User", "email": "TEST@EXAMPLE.COM", "password": "pass123" }
  ```
- **Expected DB state:** `email: "test@example.com"` stored in DB

---

### TC-EDGE-04 — Email is case-insensitive on signin

- **Preconditions:** User registered with `test@example.com`
- **Request:**
  ```
  POST /api/v1/signin
  Body: { "email": "TEST@EXAMPLE.COM", "password": "pass123" }
  ```
- **Expected status:** `200`

---

### TC-EDGE-05 — Follower/following list returns consistent data after multiple follows and unfollows

- **Actions (sequential):**
  1. UserA follows UserB
  2. UserA follows UserC
  3. UserA unfollows UserB
  4. `GET /api/v1/users/<UserA_id>/following`
- **Expected response:** Array with only UserC

---

### TC-EDGE-06 — Count is consistent with list length

- **Action:**
  1. `GET /api/v1/users/<UserA_id>/followers` → record array length `N`
  2. `GET /api/v1/users/<UserA_id>/followers/count` → record `count`
- **Expected:** `N === count`

---

## 9. Security Tests

### TC-SEC-01 — Password not returned in any API response

- **Requests to check:**
  - `POST /api/v1/signup`
  - `POST /api/v1/signin`
  - `GET /api/v1/users/:id/followers`
  - `GET /api/v1/users/:id/following`
- **Expected:** No response body contains a `password` field

---

### TC-SEC-02 — JWT uses a strong secret (not hardcoded default)

- **Check:** `JWT_SECRET` must come from environment variable, not be a hardcoded string like `'donotStoreJwtLikeThis'`
- **Expected:** Secret is loaded from `.env` and is at least 32 characters of randomness

---

### TC-SEC-03 — Token from one user cannot be used to spoof another user's follow action

- **Preconditions:** UserA and UserB both authenticated
- **Request:**
  ```
  POST /api/v1/users/<UserC_id>/follow
  Headers: Authorization: Bearer <UserA_token>
  ```
- **Expected DB state:** `follower` is UserA's ID, not UserB's ID — the follower identity must always come from the verified token, never from the request body

---

### TC-SEC-04 — SQL/NoSQL injection in email field

- **Request:**
  ```
  POST /api/v1/signin
  Body: { "email": { "$gt": "" }, "password": "anything" }
  ```
- **Expected status:** `400` (Zod should reject a non-string email)
- **Expected DB state:** No unauthorized access

---

### TC-SEC-05 — Brute force: repeated failed login attempts

- **Action:** Send 20 consecutive failed signin requests for the same email
- **Expected:** Either rate limiting kicks in (`429`) or all return `401` consistently — no server crash, no account lockout side-effects unless designed
- **Note:** Implement rate limiting (e.g., `express-rate-limit`) if not present

---

### TC-SEC-06 — CORS and sensitive headers

- **Action:** Check response headers on all endpoints
- **Expected:** `X-Powered-By: Express` header is removed; CORS policy is explicit

---

### TC-SEC-07 — Oversized payload rejection

- **Request:**
  ```
  POST /api/v1/signup
  Body: { "name": "A".repeat(100000), "email": "t@t.com", "password": "pass123" }
  ```
- **Expected status:** `400` or `413`
- **Expected:** Server does not crash; Express body size limit is configured

---

---

## 10. Manual QA Checklist — Postman Step-by-Step

Execute these steps in order in Postman. Set up an **Environment** with variables:
`base_url`, `token_a`, `token_b`, `user_a_id`, `user_b_id`, `user_c_id`

---

### Phase 1: Setup

- [ ] **Step 1** — `POST {{base_url}}/api/v1/signup`
  - Body: `{ "name": "Alice", "email": "alice@test.com", "password": "pass1234" }`
  - Save response `token` → `token_a`, `user.id` → `user_a_id`
  - Assert: status `201`, body has `token` and `user.id`

- [ ] **Step 2** — `POST {{base_url}}/api/v1/signup`
  - Body: `{ "name": "Bob", "email": "bob@test.com", "password": "pass1234" }`
  - Save response `token` → `token_b`, `user.id` → `user_b_id`
  - Assert: status `201`

- [ ] **Step 3** — `POST {{base_url}}/api/v1/signup`
  - Body: `{ "name": "Carol", "email": "carol@test.com", "password": "pass1234" }`
  - Save `user.id` → `user_c_id`
  - Assert: status `201`

---

### Phase 2: Auth Edge Cases

- [ ] **Step 4** — Duplicate signup
  - Repeat Step 1 with same email
  - Assert: status `409`

- [ ] **Step 5** — Signin success
  - `POST /api/v1/signin` with `alice@test.com` / `pass1234`
  - Assert: status `200`, response has `token`

- [ ] **Step 6** — Signin bad password
  - `POST /api/v1/signin` with `alice@test.com` / `wrongpass`
  - Assert: status `401`

- [ ] **Step 7** — No token on protected route
  - `POST /api/v1/users/{{user_b_id}}/follow` (no Authorization header)
  - Assert: status `401`

---

### Phase 3: Follow Flows

- [ ] **Step 8** — Alice follows Bob
  - `POST /api/v1/users/{{user_b_id}}/follow` (token: `token_a`)
  - Assert: status `200` or `201`, success message

- [ ] **Step 9** — Alice follows Bob again (duplicate)
  - Repeat Step 8
  - Assert: status `409`

- [ ] **Step 10** — Alice tries to follow herself
  - `POST /api/v1/users/{{user_a_id}}/follow` (token: `token_a`)
  - Assert: status `400`

- [ ] **Step 11** — Alice follows Carol
  - `POST /api/v1/users/{{user_c_id}}/follow` (token: `token_a`)
  - Assert: status `200` or `201`

- [ ] **Step 12** — Bob follows Alice
  - `POST /api/v1/users/{{user_a_id}}/follow` (token: `token_b`)
  - Assert: status `200` or `201`

---

### Phase 4: List & Count Verification

- [ ] **Step 13** — Get Alice's following list
  - `GET /api/v1/users/{{user_a_id}}/following`
  - Assert: status `200`, array has 2 items (Bob and Carol), no `password` field

- [ ] **Step 14** — Get Alice's followers list
  - `GET /api/v1/users/{{user_a_id}}/followers`
  - Assert: status `200`, array has 1 item (Bob), no `password` field

- [ ] **Step 15** — Get Alice's following count
  - `GET /api/v1/users/{{user_a_id}}/following/count`
  - Assert: status `200`, `{ "count": 2 }`

- [ ] **Step 16** — Get Alice's follower count
  - `GET /api/v1/users/{{user_a_id}}/followers/count`
  - Assert: status `200`, `{ "count": 1 }`

- [ ] **Step 17** — Verify count matches list length (manual cross-check steps 13 vs 16, 14 vs 15)

---

### Phase 5: Unfollow Flows

- [ ] **Step 18** — Alice unfollows Carol
  - `DELETE /api/v1/users/{{user_c_id}}/follow` (token: `token_a`)
  - Assert: status `200`, success message

- [ ] **Step 19** — Alice's following count drops to 1
  - `GET /api/v1/users/{{user_a_id}}/following/count`
  - Assert: `{ "count": 1 }`

- [ ] **Step 20** — Alice's following list no longer contains Carol
  - `GET /api/v1/users/{{user_a_id}}/following`
  - Assert: array length `1`, Carol's email not present

- [ ] **Step 21** — Alice tries to unfollow Carol again
  - `DELETE /api/v1/users/{{user_c_id}}/follow` (token: `token_a`)
  - Assert: status `404`

---

### Phase 6: Invalid Input

- [ ] **Step 22** — Follow with invalid ObjectId
  - `POST /api/v1/users/not-valid-id/follow` (token: `token_a`)
  - Assert: status `400`

- [ ] **Step 23** — Follow non-existent user
  - `POST /api/v1/users/000000000000000000000001/follow` (token: `token_a`)
  - Assert: status `404`

- [ ] **Step 24** — Followers count with invalid ObjectId
  - `GET /api/v1/users/bad-id/followers/count`
  - Assert: status `400`

---

### Phase 7: Security Spot Checks

- [ ] **Step 25** — Confirm no `password` in signup response
  - Re-examine Step 1 response body — assert `user` object has no `password` key

- [ ] **Step 26** — Confirm no `password` in followers/following lists
  - Re-examine Steps 13 and 14 response bodies

- [ ] **Step 27** — Confirm JWT secret is not `'donotStoreJwtLikeThis'` (code review check)

- [ ] **Step 28** — Confirm passwords are hashed in MongoDB
  - Open MongoDB Compass → `users` collection → verify `password` field starts with `$2b$`

---

### ✅ Project Sign-off Criteria

| Check | Status |
|-------|--------|
| All Phase 1–7 Postman steps pass | ⬜ |
| Passwords hashed with bcrypt in DB | ⬜ |
| No `password` field in any API response | ⬜ |
| JWT secret loaded from `.env` | ⬜ |
| Compound unique index on `follows` collection | ⬜ |
| Auth middleware rejects missing/invalid/expired tokens | ⬜ |
| All empty implementation files completed | ⬜ |
| Error responses are consistent JSON format | ⬜ |
