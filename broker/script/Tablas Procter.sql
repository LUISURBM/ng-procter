-- Table: integraciones.planning

-- DROP TABLE integraciones.planning;

CREATE TABLE integraciones.planning
(
    reg_status character varying(1) COLLATE pg_catalog."default" NOT NULL DEFAULT '1'::character varying,
    loadid integer NOT NULL DEFAULT 0,
    originlocationid character varying(20) COLLATE pg_catalog."default", - 
    vehicletype character varying(10) COLLATE pg_catalog."default", - 
    totalweightsum numeric(15,2) NOT NULL DEFAULT 0.00,
    totalvolumesum numeric(15,2) NOT NULL DEFAULT 0.00,
    totalpiecessum numeric(15,2) NOT NULL DEFAULT 0.00,
    totaldeliverycount numeric(15,2) NOT NULL DEFAULT 0.00,
    loadorderid character varying(20) COLLATE pg_catalog."default",
    licenseplate character varying(20) COLLATE pg_catalog."default", - 6 digitos 3 letras 3 numeros
    drivername character varying(80) COLLATE pg_catalog."default", - carcteres no especiales sin numeros 80
    drivercc character varying(20) COLLATE pg_catalog."default", - 10 digitos
    creation_date timestamp without time zone NOT NULL DEFAULT (now())::timestamp without time zone,
    creation_user character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    last_update timestamp without time zone NOT NULL DEFAULT '0099-01-01 00:00:00'::timestamp without time zone,
    user_update character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    CONSTRAINT planning_pkey PRIMARY KEY (loadid)
)

TABLESPACE pg_default;

ALTER TABLE integraciones.planning
    OWNER to postgres;

GRANT ALL ON TABLE integraciones.planning TO postgres;

GRANT ALL ON TABLE integraciones.planning TO "select" WITH GRANT OPTION;




-- Table: integraciones.planning_delivery

-- DROP TABLE integraciones.planning_delivery;

CREATE TABLE integraciones.planning_delivery
(
    loadid integer NOT NULL DEFAULT 0,
    deliveryid character varying(20) COLLATE pg_catalog."default" NOT NULL,
    sequencenumber integer NOT NULL DEFAULT 0,
    destinationid character varying(20) COLLATE pg_catalog."default",
    destinationname character varying(100) COLLATE pg_catalog."default",
    destinationaddress character varying(120) COLLATE pg_catalog."default",
    arrivaldatetime character varying(30) COLLATE pg_catalog."default",
    weight numeric(15,2) NOT NULL DEFAULT 0.00,
    volume numeric(15,2) NOT NULL DEFAULT 0.00,
    pieces numeric(15,2) NOT NULL DEFAULT 0.00,
    enviodate timestamp without time zone DEFAULT '0099-01-01 00:00:00'::timestamp without time zone,
    enviado character varying(1) COLLATE pg_catalog."default" DEFAULT 'N'::character varying,
    creation_date timestamp without time zone NOT NULL DEFAULT (now())::timestamp without time zone,
    creation_user character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    last_update timestamp without time zone NOT NULL DEFAULT '0099-01-01 00:00:00'::timestamp without time zone,
    user_update character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    CONSTRAINT planning__deliverypkey PRIMARY KEY (loadid, deliveryid)
)

TABLESPACE pg_default;

ALTER TABLE integraciones.planning_delivery
    OWNER to postgres;

GRANT ALL ON TABLE integraciones.planning_delivery TO postgres;

GRANT ALL ON TABLE integraciones.planning_delivery TO "select" WITH GRANT OPTION;


-- Table: integraciones.returns

-- DROP TABLE integraciones.returns;

CREATE TABLE integraciones.returns
(
    reg_status character varying(1) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    returnid integer NOT NULL DEFAULT 0,
    pickupdate timestamp without time zone DEFAULT '0099-01-01 00:00:00'::timestamp without time zone,
    commentario character varying(150) COLLATE pg_catalog."default",
    creation_date timestamp without time zone NOT NULL DEFAULT (now())::timestamp without time zone,
    creation_user character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    last_update timestamp without time zone NOT NULL DEFAULT '0099-01-01 00:00:00'::timestamp without time zone,
    user_update character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    CONSTRAINT returns_pkey PRIMARY KEY (returnid)
)

TABLESPACE pg_default;

ALTER TABLE integraciones.returns
    OWNER to postgres;

GRANT ALL ON TABLE integraciones.returns TO postgres;

GRANT ALL ON TABLE integraciones.returns TO "select" WITH GRANT OPTION;


-- Table: integraciones.returns_customer

-- DROP TABLE integraciones.returns_customer;

CREATE TABLE integraciones.returns_customer
(
    returnid integer NOT NULL DEFAULT 0,
    customerid integer NOT NULL DEFAULT 0,
    nombre character varying(100) COLLATE pg_catalog."default",
    address character varying(100) COLLATE pg_catalog."default" NOT NULL,
    contactname character varying(100) COLLATE pg_catalog."default",
    phonenumber character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT returns_customer_pkey PRIMARY KEY (returnid, customerid)
)

TABLESPACE pg_default;

ALTER TABLE integraciones.returns_customer
    OWNER to postgres;

GRANT ALL ON TABLE integraciones.returns_customer TO postgres;

GRANT ALL ON TABLE integraciones.returns_customer TO "select" WITH GRANT OPTION;


-- Table: integraciones.returns_products

-- DROP TABLE integraciones.returns_products;

CREATE TABLE integraciones.returns_products
(
    returnid integer NOT NULL DEFAULT 0,
    referencenumber integer NOT NULL DEFAULT 0,
    description character varying(100) COLLATE pg_catalog."default",
    salesunit character varying(5) COLLATE pg_catalog."default",
    quantity integer NOT NULL DEFAULT 0,
    reviewcontent character varying(5) COLLATE pg_catalog."default",
    CONSTRAINT returns_products_pkey PRIMARY KEY (returnid, referencenumber)
)

TABLESPACE pg_default;

ALTER TABLE integraciones.returns_products
    OWNER to postgres;

GRANT ALL ON TABLE integraciones.returns_products TO postgres;

GRANT ALL ON TABLE integraciones.returns_products TO "select" WITH GRANT OPTION;



-- Table: integraciones.rejects

-- DROP TABLE integraciones.rejects;

CREATE TABLE integraciones.rejects
(
    reg_status character varying(1) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    loadorderid character varying(20) COLLATE pg_catalog."default" NOT NULL,
    loadid integer NOT NULL DEFAULT 0,
    invoiceid integer NOT NULL DEFAULT 0,
    deliveryid integer NOT NULL DEFAULT 0,
    rejecttype integer NOT NULL DEFAULT 0,
    rejectdate timestamp without time zone DEFAULT '0099-01-01 00:00:00'::timestamp without time zone,
    referencenumber integer NOT NULL DEFAULT 0,
    salesunit character varying(20) COLLATE pg_catalog."default",
    quantity integer NOT NULL DEFAULT 0,
    reason integer NOT NULL DEFAULT 0,
    co character varying(20) COLLATE pg_catalog."default",
    commentario character varying(20) COLLATE pg_catalog."default",
    enviodate timestamp without time zone DEFAULT '0099-01-01 00:00:00'::timestamp without time zone,
    enviado character varying(1) COLLATE pg_catalog."default" DEFAULT 'N'::character varying,
    CONSTRAINT rejects_pkey PRIMARY KEY (loadorderid, loadid)
)

TABLESPACE pg_default;

ALTER TABLE integraciones.rejects
    OWNER to postgres;

GRANT ALL ON TABLE integraciones.rejects TO postgres;

GRANT ALL ON TABLE integraciones.rejects TO "select" WITH GRANT OPTION;


-- Table: integraciones.rejects_products

-- DROP TABLE integraciones.rejects_products;

CREATE TABLE integraciones.rejects_products
(
    reg_status character varying(1) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    loadid integer NOT NULL DEFAULT 0,
    loadorderid character varying(20) COLLATE pg_catalog."default" NOT NULL,
    invoiceid integer NOT NULL DEFAULT 0,
    referencenumber integer NOT NULL DEFAULT 0,
    quantity numeric(15,2) NOT NULL DEFAULT 0.00,
    salesunit character varying(20) COLLATE pg_catalog."default",
    reason character varying(20) COLLATE pg_catalog."default",
    crs character varying(20) COLLATE pg_catalog."default",
    comentarios character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT rejects_products_pkey PRIMARY KEY (loadid, loadorderid, invoiceid, referencenumber)
)

TABLESPACE pg_default;

ALTER TABLE integraciones.rejects_products
    OWNER to postgres;

GRANT ALL ON TABLE integraciones.rejects_products TO postgres;

GRANT ALL ON TABLE integraciones.rejects_products TO "select" WITH GRANT OPTION;


-- Table: integraciones.invoice

-- DROP TABLE integraciones.invoice;

CREATE TABLE integraciones.invoice
(
    reg_status character varying(1) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    loadid integer NOT NULL DEFAULT 0,
    deliveryid integer NOT NULL DEFAULT 0,
    invoiceid integer NOT NULL DEFAULT 0,
    customerid integer NOT NULL DEFAULT 0,
    invoicedate character varying(30) COLLATE pg_catalog."default",
    totalcost numeric(15,2) NOT NULL DEFAULT 0.00,
    creation_date timestamp without time zone NOT NULL DEFAULT (now())::timestamp without time zone,
    creation_user character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    last_update timestamp without time zone NOT NULL DEFAULT '0099-01-01 00:00:00'::timestamp without time zone,
    user_update character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    CONSTRAINT invoice_pkey PRIMARY KEY (loadid)
)

TABLESPACE pg_default;

ALTER TABLE integraciones.invoice
    OWNER to postgres;

GRANT ALL ON TABLE integraciones.invoice TO postgres;

GRANT ALL ON TABLE integraciones.invoice TO "select" WITH GRANT OPTION;



-- Table: integraciones.invoice_product

-- DROP TABLE integraciones.invoice_product;

CREATE TABLE integraciones.invoice_product
(
    loadid integer NOT NULL DEFAULT 0,
    deliveryid integer NOT NULL DEFAULT 0,
    productcode integer NOT NULL DEFAULT 0,
    ean character varying(30) COLLATE pg_catalog."default",
    description character varying(100) COLLATE pg_catalog."default",
    quantity integer NOT NULL DEFAULT 0,
    salesunit character varying(5) COLLATE pg_catalog."default",
    costo numeric(15,2) NOT NULL DEFAULT 0.00,
    CONSTRAINT invoice_productpkey PRIMARY KEY (loadid, deliveryid, productcode)
)

TABLESPACE pg_default;

ALTER TABLE integraciones.invoice_product
    OWNER to postgres;

GRANT ALL ON TABLE integraciones.invoice_product TO postgres;

GRANT ALL ON TABLE integraciones.invoice_product TO "select" WITH GRANT OPTION;



-- Table: integraciones.tablagen

-- DROP TABLE integraciones.tablagen;

CREATE TABLE integraciones.tablagen
(
    reg_status character varying(1) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    table_type character varying(30) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    table_code character varying(30) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    referencia character varying(50) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    descripcion text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    last_update timestamp without time zone NOT NULL DEFAULT now(),
    user_update character varying(10) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    creation_date timestamp without time zone NOT NULL DEFAULT now(),
    creation_user character varying(10) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    dato text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    CONSTRAINT pk_integraciones_tablagen PRIMARY KEY (table_type, table_code)
)

TABLESPACE pg_default;

ALTER TABLE integraciones.tablagen
    OWNER to postgres;

GRANT ALL ON TABLE integraciones.tablagen TO postgres;

GRANT ALL ON TABLE integraciones.tablagen TO "select" WITH GRANT OPTION;


