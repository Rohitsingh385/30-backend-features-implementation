import { Request, Response } from "express";

import { User } from "./user.model.js"

import { escapeRegex } from "../../utils/escape-regex.js";

import { getPagination } from "../../utils/pagination.js";

import { buildPaginationMeta } from "../../utils/pagination-meta.js";

export const searchUsers = async (req: Request, res: Response) => {

    try {

        const { q, page, limit, status, role, sort } = req.query as unknown as {
            q: string;
            page: number;
            limit: number;
            status?: string;
            role?: string;
            sort: string;
        };

        const { skip } = getPagination(page, limit)

        const query: any = {
            $text: {
                $search: q
            }
        }
        if (status) {
            query.status = status;
        }
        if (role) {
            query.role = role;
        }
        let sortOption: any = {
            score: {
                $meta: "textScore"
            }
        }
        if (sort === "newest") {
            sortOption = {
                createdAt: -1
            }
        }
        if (sort === "oldest") {
            sortOption = {
                createdAt: 1
            }
        }
        const [users, total] = await Promise.all([
            User.find(query, {
                score: {
                    $meta: "textScore"
                }
            })
                .sort(sortOption)
                .skip(skip)
                .limit(limit),

            User.countDocuments(query)
        ])
        res.json({
            data: users,

            pagination: buildPaginationMeta(
                page,
                limit,
                total
            )
        })
    } catch (err) {
        res.status(500).json({
            message: "something went wrong"
        })
    }
}