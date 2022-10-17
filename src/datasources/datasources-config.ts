export default {
  datasources: [
    {
      name: 'postgres',
      class: 'PostgresDatasource',
      file: 'postgres-datasource.ts'
    },
    {
      name: 'mysql',
      class: 'MysqlDatasource',
      file: 'mysql-datasource.ts'
    },
    {
      name: 'csv',
      class: 'CSVDatasource',
      file: ''
    }
  ]
}