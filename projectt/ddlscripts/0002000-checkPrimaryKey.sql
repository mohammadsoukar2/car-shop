CREATE OR REPLACE FUNCTION checkPrimaryKey (tablename TEXT , constraintname TEXT) 
RETURNS void
AS 
$$
BEGIN
   IF NOT EXISTS
   (
       SELECT constraint_name
       FROM information_schema.table_constraints
       WHERE tablename=table_name AND constraint_type='PRIMARY KEY'

   ) THEN
     EXECUTE 'ALTER TABLE public."'||tablename||'"ADD CONSTRAINT"'|| constraintname||'"PRIMARY KEY(id);';
    END IF;
END;     
$$ LANGUAGE plpgsql   