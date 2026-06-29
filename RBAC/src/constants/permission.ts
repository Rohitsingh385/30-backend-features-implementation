export const ROLES = {
    ADMIN: "ADMIN",
    EDITOR: "EDITOR",
    USER: "USER"
} as const ;
export const PERMISSIONS = {
    CREATE_POST: "CREATE_POST",
    EDIT_POST: "EDIT_POST",
    DELETE_POST: "DELETE_POST",
    BAN_USER: "BAN_USER"
} as const;
export const ROLE_PERMISSION = {
    ADMIN: [
        PERMISSIONS.CREATE_POST,
        PERMISSIONS.BAN_USER,
        PERMISSIONS.DELETE_POST,
        PERMISSIONS.EDIT_POST
    ],
    EDITOR: [
        PERMISSIONS.CREATE_POST,
        PERMISSIONS.DELETE_POST,
        PERMISSIONS.EDIT_POST
    ],
    USER: [
        PERMISSIONS.CREATE_POST
    ]

} as const;


