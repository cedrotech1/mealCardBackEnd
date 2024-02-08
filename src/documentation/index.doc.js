import { name } from "ejs";
import { Router } from "express";
import { serve, setup } from "swagger-ui-express";

const docrouter = Router();

const options = {
  openapi: "3.0.1",
  info: {
    title: "Meal card APIs documentation",
    version: "1.0.0",
    description: "meal card APIs documentation",
  },
  basePath: "/api",
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    { name: "System Authontication", description: "" },
    { name: "Users", description: "Users" },
    { name: "Restaurent", description: "Restaurent" },
    { name: "cards", description: "cards" },
    { name: "categories", description: "categories" },

  ],
  paths: {
    "/api/v1/auth/login": {
      post: {
        tags: ["System Authontication"],
        summary: "Login a user",
        description: "Login a user",
        operationId: "loginUser",
        security: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                email: "admin@gmail.com",
                password: "admin",
              },
            },
            required: true,
          },
        },
        responses: {
          200: {
            description: "User logged in successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/addUser": {
      post: {
        tags: ["Users"],
        summary: "Add a user",
        description: "Add a user",
        operationId: "addOneUser",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                firstname: "John",
                lastname: "Doe",
                email: "test@example.com",
                phone: "08012345678",
                role: "ex:[customer,employee,restaurentadmin,superadmin]",
                restaurents: "1",
                status: "active",
             
              },
            },
            required: true,
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/signup": {
      post: {
        tags: ["Users"],
        summary: "Add a customer/restaurent admin",
        description: "Add a user",
        operationId: "addcustomerorrestadmin",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                firstname: "John",
                lastname: "Doe",
                email: "test@example.com",
                phone: "08012345678",
                role: "ex:[customer,employee,restaurentadmin,superadmin]",
                gender: "male",
                address: "huye/tumba",
                // restaurents: "1",
                status: "active",
             
              },
            },
            required: true,
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users": {
      get: {
        tags: ["Users"],
        summary: "Get all users",
        description: "Get all users",
        operationId: "getAllUsers",
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get a user",
        description: "Get a user",
        operationId: "getOneUser",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "User's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/update/{id}": {
      put: {
        tags: ["Users"],
        summary: "Update a user",
        description: "Update a user",
        operationId: "updateOneUser",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "User's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                firstname: "John",
                lastname: "Doe",
                email: "test@example.com",
                phone: "08012345678",
              },
            },
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/changePassword": {
      put: {
        tags: ["Users"],
        summary: "change  user password",
        description: "change  user password  for current loged in user !! ",
        operationId: "change-passwordr",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                oldPassword: "oldp",
                newPassword: "newp",
                confirmPassword: "cpass",
               
              },
            },
          },
        },
        responses: {
          200: {
            description: "User password updated  successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },



    "/api/v1/users/delete/{id}": {
      delete: {
        tags: ["Users"],
        summary: "Delete a user",
        description: "Delete a user",
        operationId: "deleteOneUser",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "User's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/activate/{id}": {
      put: {
        tags: ["Users"],
        summary: "Activate a user",
        description: "Activate a user",
        operationId: "activateOneUser",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "User's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User activated successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/users/deactivate/{id}": {
      put: {
        tags: ["Users"],
        summary: "Deactivate a user",
        description: "Deactivate a user",
        operationId: "deactivateOneUser",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "User's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deactivated successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
   






    "/api/v1/restaurent/add": {
      post: {
        tags: ["Restaurent"],
        summary: "Add a restaurent",
        description: "Add a restaurent",
        operationId: "addrestaurent",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Restaurent",
              },
              example: {
                name: "obina",
                address: "huye/ngoma",
                description: "restourent descri.......",
               
              },
            },
            required: true,
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/restaurent/": {
      get: {
        tags: ["Restaurent"],
        summary: "Get a resto",
        description: "Get a resto",
        operationId: "getOneresto",
    
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/restaurent/delete/{id}": {
      delete: {
        tags: ["Restaurent"],
        summary: "delete a resto",
        description: "delete a resto",
        operationId: "deleteOneresto",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Restaurent's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    // "/api/v1/restaurent/": {
    //   put: {
    //     tags: ["Restaurent"],
    //     summary: "Update a Restaurent",
    //     description: "Update a Restaurent",
    //     operationId: "updateOneRestaurent",

    //     requestBody: {
    //       content: {
    //         "application/json": {
    //           schema: {
    //             $ref: "#/components/schemas/Restaurent",
    //           },
    //           // example: {
    //           //   firstname: "John",
    //           //   lastname: "Doe",
    //           //   email: "test@example.com",
    //           //   phone: "08012345678",
    //           // },
    //         },
    //       },
    //     },
    //     responses: {
    //       200: {
    //         description: "Restaurent updated successfully",
    //       },
    //       400: {
    //         description: "Bad request",
    //       },
    //       401: {
    //         description: "Unauthorized",
    //       },
    //       404: {
    //         description: "User not found",
    //       },
    //       500: {
    //         description: "Something went wrong",
    //       },
    //     },
    //   },
    // },
    "/api/v1/Restaurent/one/{id}": {
      get: {
        tags: ["Restaurent"],
        summary: "Get a Restaurent",
        description: "Get a Restaurent",
        operationId: "getOneRestaurent",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Restaurent's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/restaurent/activate/{id}": {
      put: {
        tags: ["Restaurent"],
        summary: "activate a Restaurent",
        description: "activate a Restaurent",
        operationId: "activateOneRestaurent",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Restaurent's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],

        responses: {
          200: {
            description: "Restaurent activated successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/restaurent/disactivate/{id}": {
      put: {
        tags: ["Restaurent"],
        summary: "disactivate a Restaurent",
        description: "disactivate a Restaurent",
        operationId: "disactivateOneRestaurent",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Restaurent's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],

        responses: {
          200: {
            description: "Restaurent disactivated successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },






    "/api/v1/categories/add": {
      post: {
        tags: ["categories"],
        summary: "Add a restaurent",
        description: "Add a restaurent",
        operationId: "addrestaurent",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/categories",
              },
              // example: {
              //   name: "obina",
              //   address: "huye/ngoma",
              //   description: "restourent descri.......",
               
              // },
            },
            required: true,
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/categories/": {
      get: {
        tags: ["categories"],
        summary: "Get a categories",
        description: "Get a categories",
        operationId: "getOnecategory",
    
        responses: {
          200: {
            description: "categories deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/categories/delete/{id}": {
      delete: {
        tags: ["categories"],
        summary: "delete a categories",
        description: "delete a categories",
        operationId: "deleteOnecategories",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Restaurent's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/categories/{id}": {
      put: {
        tags: ["categories"],
        summary: "Update a categories",
        description: "Update a categories",
        operationId: "updateOnecategories",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "categories's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/categories",
              },
              // example: {
              //   firstname: "John",
              //   lastname: "Doe",
              //   email: "test@example.com",
              //   phone: "08012345678",
              // },
            },
          },
        },
        responses: {
          200: {
            description: "categories updated successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/categories/one/{id}": {
      get: {
        tags: ["categories"],
        summary: "Get a categories",
        description: "Get a categories",
        operationId: "getOnecategories",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "categories's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "categories deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/categories/activate/{id}": {
      put: {
        tags: ["categories"],
        summary: "Activate a categories",
        description: "Activate a categories",
        operationId: "activatecategories",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "categories's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "categories activated successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/categories/diactivate/{id}": {
      put: {
        tags: ["categories"],
        summary: "DisActivate a categories",
        description: "DisActivate a categories",
        operationId: "disactivatecategories",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "categories's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "categories disactivated successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    



    
    "/api/v1/card/": {
      get: {
        tags: ["cards"],
        summary: "Get a cards",
        description: "Get a cards",
        operationId: "getcards",
    
        responses: {
          200: {
            description: "cards deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/card/statistics": {
      get: {
        tags: ["cards"],
        summary: "Get a statistics",
        description: "Get a statistics",
        operationId: "getstatistics",
    
        responses: {
          200: {
            description: "statistics retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/card/report": {
      get: {
        tags: ["cards"],
        summary: "Get a statistics",
        description: "Get a statistics",
        operationId: "getreport",
    
        responses: {
          200: {
            description: "statistics retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/card/Mreport/{start}/{end}": {
      get: {
        tags: ["cards"],
        summary: "Get a month report",
        description: "Get a statistics",
        operationId: "getMreport",
        parameters: [
          {
            name: "start",
            in: "path",
            description: "start date",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "end",
            in: "path",
            description: "end date",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
    
     
    
        responses: {
          200: {
            description: "statistics retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/card/one/{id}": {
      get: {
        tags: ["cards"],
        summary: "Get a cards",
        description: "Get a cards",
        operationId: "getOnecards",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "card's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
    
        responses: {
          200: {
            description: "cards deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/card/mycard/{id}": {
      get: {
        tags: ["cards"],
        summary: "Get a cards",
        description: "Get a cards",
        operationId: "getOnecards1",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "card's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
    
        responses: {
          200: {
            description: "cards deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/card/delete/{id}": {
      delete: {
        tags: ["cards"],
        summary: "delete a cards",
        description: "delete a cards",
        operationId: "deleteOnecards",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "card's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
    
        responses: {
          200: {
            description: "cards deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/card/add": {
      post: {
        tags: ["cards"],
        summary: "add a cards",
        description: "add a cards",
        operationId: "addOnecards",
      
        requestBody: {
          content: {
            "application/json": {
           
              example: {
               
                userid: "2",
                times: "30",
                
              },
            },
            required: true,
          },
        },
    
        responses: {
          200: {
            description: "cards deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/card/{id}": {
      put: {
        tags: ["cards"],
        summary: "update a cards",
        description: "update a cards",
        operationId: "updateOnecards",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Restaurent's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
        requestBody: {
          content: {
            "application/json": {
           
              example: {
                restaurent: "1",
                userid: "2",
                times: "30",
                status:"available"
              },
            },
            required: true,
          },
        },
    
        responses: {
          200: {
            description: "cards deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/card/use/{id}": {
      put: {
        tags: ["cards"],
        summary: "update a cards",
        description: "update a cards",
        operationId: "updateCard",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "card's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
        requestBody: {
          content: {
            "application/json": {
           
              example: {
                restaurent: "1",
                userid: "2",
                use: "30",
                status:"available"
              },
            },
            required: true,
          },
        },
    
        responses: {
          200: {
            description: "cards deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },


  },

  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          firstname: {
            type: "string",
            description: "User's firstname",
          },
          lastname: {
            type: "string",
            description: "User's lastname",
          },
          username: {
            type: "string",
            description: "User's names",
          },
          gender: {
            type: "string",
            description: "User's gender",
          },
          dob: {
            type: "string",
            description: "User's date of birth",
          },
          address: {
            type: "string",
            description: "User's address",
          },
          phone: {
            type: "string",
            description: "User's phone number",
          },
          role: {
            type: "string",
            description: "User's role",
          },
          image: {
            type: "string",
            description: "User's profile image",
            format: "binary",
          },
          email: {
            type: "string",
            description: "User's email",
          },
          password: {
            type: "string",
            description: "User's password",
          },
          confirm_password: {
            type: "string",
            description: "User's confirm password",
          },
        },
      },
      Restaurent: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "restaurent name",
          },
          address: {
            type: "string",
            description: "restaurent address",
          },
          description: {
            type: "string",
            description: "restaurent's description",
          },
          image: {
            type: "string",
            description: "rest's profile image",
            format: "binary",
          },

        },
      },
      Cards: {
        type: "object",
        properties: {
          restaurent: {
            type: "string",
            description: "restaurent id",
          },
          category: {
            type: "string",
            description: "category id",
          },
          userid: {
            type: "string",
            description: "restaurent address",
          },
          times: {
            type: "string",
            description: "restaurent card times",
          },
          status: {
            type: "string",
            description: "card's status",
          },

        },
      },
      categories: {
        type: "object",
        properties: {

          restaurent: {
            type: "string",
            description: "restaurent id",
          },
          name: {
            type: "string",
            description: "name address",
          },
          description: {
            type: "string",
            description: "category description",
          },
          price: {
            type: "string",
            description: "card's status",
          },
          status: {
            type: "string",
            description: "card's status",
          },

        },
      },

    
    },

    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

docrouter.use("/", serve, setup(options));

export default docrouter;
