const {projects,clients} = require("../sampleData")

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType} = require("graphql")

const Project = require("../models/Project")
const Client = require("../models/Client")


//Project Type

const ProjectType = new GraphQLObjectType({
    name:"Project",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        client:{
            type:ClientType,
            resolve(parent,args){
                return Client.findById(parent.clientId)
            }
        }
    })
})


//Client Type

const ClientType = new GraphQLObjectType({
    name:"Client",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        clients:{
            type:GraphQLList(ClientType),
            resolve(parent,args){
                return Client.find()
            }
        },
        client:{
            type:ClientType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Client.findById(args.id)
            }
        },
        projects:{
            type:GraphQLList(ProjectType),
            resolve(parent,args){
                return Project.find()
            }
        },
        project:{
            type:ProjectType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Project.findById(args.id)
            }
        },
        
        
    }
})

// Mutations
const mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addClient:{
            type:ClientType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                email:{type:GraphQLNonNull(GraphQLString)},
                phone:{type:GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                const client = new Client({
                    name:args.name,
                    email:args.email,
                    phone:args.phone,    
                });

                return client.save()
            }
        },
        deleteClient:{
            type:ClientType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                return Client.findByIdAndRemove(args.id)
            }
        },
        addProject:{
            type:ProjectType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                description:{type:GraphQLNonNull(GraphQLString)},
                status:{
                    type:new GraphQLEnumType({
                        name:"ProjectStatus",
                        values:{
                            new:{value:"Not started"},
                            progress:{value:"In progress"},
                            completed:{value:"Completed"}
                        }
                    }),
                    defaultValue:"Not started"
                },
                clientId:{type:GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                const project = new Project({
                    name:args.name,
                    description:args.description,
                    status:args.status,
                    clientId:args.clientId
                })
            return project.save()
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation,
})