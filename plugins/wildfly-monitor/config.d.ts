export interface Config {
    wildfly: {
        /** 
         * server url
         * @visibility frontend
        */
        url : String;

        /** 
         * username
         * @visibility frontend
        */
        username : String;
       
        /** 
         * password
         * @visibility frontend
        */
        password : String
    };
}