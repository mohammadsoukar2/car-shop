CREATE OR REPLACE FUNCTION getFieldType(tablename  TEXT, columnname TEXT)
RETURNS TEXT 
LANGUAGE plpgsql
as 
$getFieldType$
DECLARE
 res TEXT;
BEGIN
 SELECT data_type INTO res FROM information_schema.columns WHERE table_name=tablename AND column_name=columnname ;
 RETURN res;
END
$getFieldType$
