import { getProductsInput } from "./product.validation";
import { Query, QueryFilter } from "mongoose"

export class ProductQueryBuilder {

    public query: Query<any, getProductsInput>;
    public filters: getProductsInput["query"];
    public mongoFilter: QueryFilter<getProductsInput> = {}
    constructor(query: Query<any, getProductsInput>, filters: getProductsInput["query"]) {
        this.query = query;
        this.filters = filters
    }
    filter() {

        if (this.filters.category) {
            this.mongoFilter.category = this.filters.category
        }
        if (this.filters.brand) {
            this.mongoFilter.brand = this.filters.brand
        }
        if (this.filters.minPrice || this.filters.maxPrice) {
            this.mongoFilter.price = {}
        }
        if (this.filters.minPrice) {
            this.mongoFilter.price.$gte = this.filters.minPrice
        }
        if (this.filters.maxPrice) {
            this.mongoFilter.price.$lte = this.filters.maxPrice
        }
        if (this.filters.minRating) {
            this.mongoFilter.rating = {
                $gte: this.filters.minRating
            }
        }
        this.query = this.query.find(this.mongoFilter)
        return this
    }
    search() {
        if (this.filters.search) {
            this.query = this.query.find({
                $or: [
                    {
                        name: {
                            $regex: this.filters.search,
                            $options: "i"
                        }
                    },
                    {
                        description: {
                            $regex: this.filters.search,
                            $options: "i"
                        }
                    }
                ]
            })
        }
        return this
    }
    sort() {

        const sortQuery: Record<string, 1 | -1> = {
            createdAt: -1
        }
        if(this.filters.sort === "price"){
            sortQuery.price = 1
        }
        if(this.filters.sort === "-price"){
            sortQuery.price = -1
        }
        if(this.filters.sort === "rating"){
            sortQuery.rating = 1
        }
        if(this.filters.sort === "-rating"){
            sortQuery.rating = -1
        }
        if(this.filters.sort === "createdAt"){
            sortQuery.createdAt =  1
        }
        if(this.filters.sort === "-createdAt"){
            sortQuery.createdAt = -1
        }

        this.query = this.query.sort(sortQuery)
        return this
    }
    paginate(){
        const page = this.filters.page ?? 1;
        const limit = this.filters.limit ?? 20
        const skip = (page -1) * limit 

        this.query = this.query 
                        .skip(skip)
                        .limit(limit)
        return this
    }
    build(){
        return this.query
    }
    getFilter(){
        return this.mongoFilter
    }
}