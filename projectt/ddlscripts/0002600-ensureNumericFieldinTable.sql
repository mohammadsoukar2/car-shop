CREATE OR REPLACE FUNCTION ensurNumericFieldinTable (tablename TEXT , fieldname TEXT) RETURNS void AS $$
    BEGIN 
        EXECUTE 'ALTER TABLE public."' || tablename || '" ADD COLUMN IF NOT EXISTS "' || fieldname || '" NUMERIC';

        IF NOT EXISTS (
        SELECT data_type
        FROM information_schema.columns
        WHERE table_name=tablename AND data_type ='numeric'
        ) THEN 
            EXECUTE 'ALTER TABLE public."'||tablename||'"ALTER COLUMN "'||fieldname||'"TYPE NUMERIC USING"'||fieldname||'"::NUMERIC;';
        END IF;
    END;
$$ LANGUAGE plpgsql;  