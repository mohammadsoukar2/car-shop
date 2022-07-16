DO $$ BEGIN 


CREATE TABLE IF NOT EXISTS public."agency"(
    id TEXT DEFAULT uuid_generate_v1()
);

EXECUTE public.checkPrimaryKey('agency','agency_pk');

EXECUTE public.ensureTextFieldinTable('agency','name');

EXECUTE public.ensureTextFieldinTable('agency','email');
CREATE UNIQUE INDEX IF NOT EXISTS user_lower_case_email_idx ON public."user" (lower(email));

EXECUTE public.ensureTextFieldinTable('agency','facebook');
ALTER TABLE public."agency" ALTER COLUMN "facebook" SET NOT NULL;

EXECUTE public.ensureTextFieldinTable('agency','location');
ALTER TABLE public."agency" ALTER COLUMN "location" SET NOT NULL;

EXECUTE public.ensureTextFieldinTable('agency','user_id');
ALTER TABLE public."agency" ALTER COLUMN "user_id" SET NOT NULL;

ALTER TABLE public."agency"
ADD CONSTRAINT fk44436
FOREIGN  KEY (user_id)
REFERENCES public."user"(id);
END $$
