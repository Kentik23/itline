DO $$ 
BEGIN 
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'my_database') THEN 
      CREATE DATABASE my_database;
   END IF;
END $$;