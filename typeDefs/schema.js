const graphql = require("graphql")
const _ = require("lodash");

const { GraphQLList, GraphQLID, GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const attendances = [
    {date: "25/03/2021",
    department: "Bilgi İşlem",
    name: "Fadime Özdemir"},
    {date: "10/05/2021",
    department: "Satış",
    name: "Gökçe Aslan"}
]

// these are type definitions
const AttendanceType = new GraphQLObjectType({
    name: "Attendance",
    fields: () => ({
        name: { type: GraphQLString },
        date: { type: GraphQLString },
        department:{ type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "Query",
    fields: {
        search: {
            type: new GraphQLList(AttendanceType),
            args: { name: { type: GraphQLString }, date: { type: GraphQLString }, department:{ type: GraphQLString }},
            resolve( __, args) {
                // get data from db
                const filteredArr = attendances.filter(attendance => {
                    return Object.keys(args).every(filter => {
                        return args[filter] === attendance[filter]
                    });
                });
                console.log("filtered", filteredArr)
                return filteredArr
            }
        },
        attendances: {
            type: new GraphQLList(AttendanceType),
            resolve(parent, args){
                return attendances
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: null
})