CREATE TABLE kick (stream_id varchar(255) not null, view_count varchar(255) not null, scan_time varchar(255) not null, run_time varchar(255));
.separator ,
.import yo.csv kick

