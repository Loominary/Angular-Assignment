RUN THE APP: 
> SET DEBUG=angular-assignment:_ & npm start |OR| SET DEBUG='angular-assignment:_'; npm start

------------------------------------------------------------------------------------------------

     Database tables and fields:
     Database name: set up config!
     users: id, first_name, last_name, email, password
     customers: id, first_name, last_name, phone, email

------------------------------------------------------------------------------------------------

Empty config/dev template:


        module.exports = {
            DB_HOST: '',
            DB_USER: '',
            DB_PASSWORD: '',
            DB_DATABASE: '',

            //AUTH
            JWT_SECRET: '',

        }
