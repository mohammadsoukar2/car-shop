DO $$ BEGIN

CREATE TABLE IF NOT EXISTS public."user"(
    id TEXT DEFAULT uuid_generate_v1()
);

EXECUTE public.checkPrimaryKey('user','user_pk');

EXECUTE public.ensureTextFieldinTable('user','fname');
ALTER TABLE public."user" ALTER COLUMN "fname" SET NOT NULL;

EXECUTE public.ensureTextFieldinTable('user','lname');
ALTER TABLE public."user" ALTER COLUMN "lname" SET NOT NULL;

EXECUTE public.ensureTextFieldinTable('user','user_name');
ALTER TABLE public."user" ALTER COLUMN "user_name" SET NOT NULL;

EXECUTE public.ensureTextFieldinTable('user','address');
ALTER TABLE public."user" ALTER COLUMN "address" SET NOT NULL;

EXECUTE public.ensureTextFieldinTable('user','password');
ALTER TABLE public."user" ALTER COLUMN "password" SET NOT NULL;

EXECUTE public.ensureTextFieldinTable('user','phone_number');
-- ALTER TABLE public."user" ALTER COLUMN "phone_number" SET NOT NULL;

EXECUTE public.ensureTextFieldinTable('user','email');
ALTER TABLE public."user" ALTER COLUMN "email" SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS user_lower_case_email_idx ON public."user" (lower(email));

EXECUTE public.ensureTextFieldinTable('user','sec_question');

EXECUTE public.ensureTextFieldinTable('user','photo');

-- EXECUTE public.ensureBooleanFieldinTable('user','isVerified');
-- ALTER TABLE public."user" ALTER COLUMN "isVerified" SET DEFAULT false;

EXECUTE public.ensureBooleanFieldinTable('user','isAdmin');
ALTER TABLE public."user" ALTER COLUMN "isAdmin" SET DEFAULT false;

END $$







