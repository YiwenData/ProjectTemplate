create or replace function dedupe_rds_table(schema_name text, table_name text) returns integer
    language plpgsql
as
$$
declare
    dynCmd       varchar := 'WITH R as (' ||
                            'select rid, ' ||
                            'row_number() over (' ||
                            'partition by hashcode ' ||
                            'order by created_at desc) rownum ' ||
                            'from %1$I.%2$I ), ' ||
                            'Dup as ( select * from R where rownum > 1 ) ' ||
                            'delete from %1$I.%2$I S using Dup ' ||
                            'where Dup.rid = S.rid ' ||
                            'returning Dup.rid;';
    deletedCount integer;
begin
    execute format(dynCmd, lower(schema_name), lower(table_name));

    get diagnostics deletedCount = ROW_COUNT;
    return deletedCount;
end;
$$;

alter function dedupe_rds_table(text, text) owner to postgres;

