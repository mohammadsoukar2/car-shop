DO $$ BEGIN


CREATE TABLE IF NOT EXISTS public."part"(
    id TEXT DEFAULT uuid_generate_v1()
);

EXECUTE public.checkPrimaryKey('part','part_pk');

EXECUTE public.ensureTextFieldinTable('part','name');
ALTER TABLE public."part" ALTER COLUMN "name" SET NOT NULL;

EXECUTE public.ensureTextFieldinTable('part','year');
ALTER TABLE public."part" ALTER COLUMN "year" SET NOT NULL;

EXECUTE public.ensureTextFieldinTable('part','photo');

EXECUTE public.ensureTextFieldinTable('part','model_id');
ALTER TABLE public."part" ALTER COLUMN "model_id" SET NOT NULL;

EXECUTE public.ensureTextFieldinTable('part','store_id');
ALTER TABLE public."part" ALTER COLUMN "store_id" SET NOT NULL;

ALTER TABLE public."part"
ADD CONSTRAINT fk66654
 FOREIGN  KEY (model_id)
  REFERENCES public."model"(id);

ALTER TABLE public."part"
ADD CONSTRAINT fk55561
FOREIGN  KEY (store_id)
REFERENCES public."store"(id);
END $$
