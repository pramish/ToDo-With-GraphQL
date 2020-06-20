const {GraphQLScalarType} = require('graphql')

module .exports =  Void = new GraphQLScalarType({
    name: "Void",
    description: "Represents NULL values",
    serialize() {
        return null
    },
    parseLiteral() {
        return null;
    },
    parseValue() {
        return null;
    }
})