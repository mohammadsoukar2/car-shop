DO $$ BEGIN

CREATE TABLE IF NOT EXISTS public."car"(
    id TEXT DEFAULT uuid_generate_v1()
);
EXECUTE public.checkPrimaryKey('car','car_pk');


EXECUTE public.ensureTextFieldinTable('car','color');
ALTER TABLE public."car" ALTER COLUMN "color" SET NOT NULL;


EXECUTE public.ensureTextFieldinTable('car','doors');
ALTER TABLE public."car" ALTER COLUMN "doors" SET NOT NULL;


EXECUTE public.ensurNumericFieldinTable('car','price');
ALTER TABLE public."car" ALTER COLUMN "price" SET NOT NULL;

EXECUTE public.ensureTextFieldinTable('car','year');
ALTER TABLE public."car" ALTER COLUMN "year" SET NOT NULL;


EXECUTE public.ensureTextFieldinTable('car','images');
ALTER TABLE public."car" ALTER COLUMN "images" SET NOT NULL;

EXECUTE public.ensureTextFieldinTable('car','model_id');
ALTER TABLE public."car" ALTER COLUMN "model_id" SET NOT NULL;

EXECUTE public.ensureTextFieldinTable('car','agency_id');
ALTER TABLE public."car" ALTER COLUMN "agency_id" SET NOT NULL;

IF public.getFieldType('car','images') != 'ARRAY' THEN
    ALTER TABLE public."car"
    ALTER COLUMN "images" TYPE TEXT []
    USING "images"  :: TEXT[];
END IF ;

ALTER TABLE public."car"
ADD CONSTRAINT fk11123
 FOREIGN  KEY (model_id)
  REFERENCES public."model"(id);

  
ALTER TABLE public."car"
ADD CONSTRAINT fk22214
 FOREIGN  KEY (agency_id)
  REFERENCES public."agency"(id);

END $$
