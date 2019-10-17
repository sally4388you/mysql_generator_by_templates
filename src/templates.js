var templates = {
	check_duplicates_1: {
		p1: {value: '', name: 'Param 1', color: '#94723d'},
	    p2: {value: '', name: 'Param 2', color: '#94723d'},
	    p3: {value: '', name: 'Param 3', color: '#94723d'},
	    db1: {value: '', name: 'Database 1', color: '#94723d'},
	    tb1: {value: '', name: 'Table 1', color: '#94723d'},
	    sql: 'SELECT $p1, $p2, COUNT($p3) FROM $db1.$tb1 GROUP BY $p1, $p2 HAVING COUNT($p3) > 1;'
	},
	find_different_records: {
		columns: {value: '', name: 'Columns', color: '#94723d'},
		db1: {value: '', name: 'Database 1', color: '#94723d'},
		db2: {value: '', name: 'Database 2', color: '#94723d'},
		table: {value: '', name: 'Table', color: '#94723d'},
		primary_key: {value: '', name: 'Primary Key', color: '#94723d'},
		sql: 'SELECT $columns FROM (SELECT a.* FROM $db1.$table as a UNION ALL SELECT b.* FROM $db2.$table as b) t GROUP BY $columns HAVING COUNT(*) = 1 ORDER BY $primary_key;'
	}
};


export default templates;