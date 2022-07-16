DO $$ BEGIN 
CREATE TABLE IF NOT EXISTS public."store"(
    id TEXT DEFAULT uuid_generate_v1()
);

EXECUTE public.checkPrimaryKey('store','store_pk');

EXECUTE public.ensureTextFieldinTable('store','name');
-- ALTER TABLE public."model" ALTER COLUMN "modelname" SET NOT NULL


-- EXECUTE public.ensureTextFieldinTable('store','owner_name');
-- ALTER TABLE public."store" ALTER COLUMN "owner_name" SET NOT NULL;

-- EXECUTE public.ensureTextFieldinTable('store','owner_number');
-- ALTER TABLE public."store" ALTER COLUMN "owner_number" SET NOT NULL;

EXECUTE public.ensureTextFieldinTable('store','email');
CREATE UNIQUE INDEX IF NOT EXISTS user_lower_case_email_idx ON public."user" (lower(email));

EXECUTE public.ensureTextFieldinTable('store','facebook');
ALTER TABLE public."store" ALTER COLUMN "facebook" SET NOT NULL;


EXECUTE public.ensureTextFieldinTable('store','location');
ALTER TABLE public."store" ALTER COLUMN "location" SET NOT NULL;

EXECUTE public.ensureTextFieldinTable('store','user_id');
ALTER TABLE public."store" ALTER COLUMN "user_id" SET NOT NULL;

ALTER TABLE public."store"
ADD CONSTRAINT fk33345
FOREIGN  KEY (user_id)
REFERENCES public."user"(id);

END $$
