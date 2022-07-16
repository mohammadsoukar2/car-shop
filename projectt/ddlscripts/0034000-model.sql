DO $$ BEGIN

CREATE TABLE IF NOT EXISTS public."model"(
    id TEXT DEFAULT uuid_generate_v1()
);

EXECUTE public.checkPrimaryKey('model','model_pk');

EXECUTE public.ensureTextFieldinTable('model','make');
ALTER TABLE public."model" ALTER COLUMN "make" SET NOT NULL;

EXECUTE public.ensureTextFieldinTable('model','model_name');
ALTER TABLE public."model" ALTER COLUMN "model_name" SET NOT NULL;

EXECUTE public.ensureTextFieldinTable('model','type');
ALTER TABLE public."model" ALTER COLUMN "type" SET NOT NULL;

EXECUTE public.ensureTextFieldinTable('model','fuel');
ALTER TABLE public."model" ALTER COLUMN "fuel" SET NOT NULL;

EXECUTE public.ensureTextFieldinTable('model','transmission');
ALTER TABLE public."model" ALTER COLUMN "transmission" SET NOT NULL;

END $$
