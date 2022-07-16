CREATE OR REPLACE FUNCTION ensureTextFieldinTable(tablename TEXT , fieldname TEXT) RETURNS void AS $$
    BEGIN 
        EXECUTE 'ALTER TABLE public."' || tablename || '" ADD COLUMN IF NOT EXISTS "' || fieldname || '" TEXT';
        IF NOT EXISTS (
        SELECT data_type 
        FROM information_schema.columns
        WHERE table_name=tablename AND data_type='text'

       ) THEN 
           EXECUTE 'ALTER TABLE public."' || tablename || '" ALTER COLUMN "' || fieldname || '" TYPE TEXT USING "' || fieldname || '"::TEXT;';

        END IF;
    END;

$$ LANGUAGE plpgsql