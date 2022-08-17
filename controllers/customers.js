const database = require('./database');
const joi = require('joi')

module.exports ={
    getAllCustomers: async function(req,res,next){
        const param = req.query;

        const schema = joi.object({
            column: joi.string().valid('first_name', 'last_name', 'email').default('name'),
            sort: joi.string().valid('ASC', 'DESC').default('ASC'),
        });

        const { error, value } = schema.validate(param);

        if (error) {
            console.log(error);
            res.status(400).send('add failed');
            return
        }

        const fieldsMap = new Map([
            ['first_name', 'customers.first_name'],
            ['last_name', 'customers.last_name'],
            ['email', 'countries.email'],
        ]);

        const sql= "SELECT * FROM customers"

        try{
            const result = await database.query(sql);
            res.json(result[0])
        }
        catch(err){
            console.log(err);
        }
    },


    addCustomer: async function(req,res,next){
        const reqBody = req.body;

        const schema = joi.object({
            first_name: joi.string().required().min(2).max(200),
            last_name: joi.string().required().min(2).max(200),
            phone: joi.string().required().regex(/^[0-9]{8,11}$/),
            email:joi.string().required().regex(/^[^@]+@[^@]+$/),
        });

        const {error, value} = schema.validate(reqBody);

        if(error){
            console.log(error);
            return;
        }

        const sql = 
        "INSERT INTO customers(first_name, last_name, phone, email)" 
        + "VALUES(?,?,?,?);";

        try{
            const result = await database.query(
                sql,
                [value.first_name, value.last_name, value.phone, value.email]
                );

                console.log(value.id);
                value.id = result[0].insertId;
                res.json(value);
        }
        catch(err){
            console.log(err);
            return;
        }

    },


    editCustomer: async function(req, res, next){
        const reqBody = req.body;
        console.log('The request is:', reqBody);

        const schema = joi.object({
            first_name: joi.string().min(2).max(100),
            last_name: joi.string().min(2).max(300),
            phone: joi.string().regex(/^[0-9]{8,11}$/),
            email: joi.string().regex(/^[^@]+@[^@]+$/),
        }).min(1);



        const { error, value } = schema.validate(reqBody);
        

        if (error) {
            console.log(value);
            res.status(400).send(`Error updating customer: ${error}`);
            return;
        }
       

        const keys = Object.keys(value);   
        const values = Object.values(value); 
        const fields = keys.map(key => `${key}=?`).join(',');
        
        
        values.push(req.params.id);


        const sql = `UPDATE customers SET ${fields} WHERE id=?`;

        try {
            const result = await database.query(sql, values);
            console.log(values);
            res.json(value);
        }
        catch (err) {
            console.log(err);
            return;
        }


    },

    
    deleteCustomer: async function (req, res, next){
        
         
         const schema = joi.object({
             id: joi.number().required(),
         })
 
         
 
         const {error, value} = schema.validate(req.params);
 
        
         console.log(value);
 
         if (error) {
             res.status(400).send('Error with deleting customer');
             console.log(error.details[0].message);
             return;
         }
 
         const sql = `DELETE FROM customers WHERE id=?`;
 
       
 
         try {
             const result = await database.query(sql, [value.id]);
             console.log('Customer was successfuly deleted');
             
         }
         catch (err) {
             res.status(400).send('Error while deleting customer');
             console.log(err);
         }
 
     },
 

    
    
}