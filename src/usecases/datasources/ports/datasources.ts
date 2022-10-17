interface DataSource {
  getData(query: string): Promise<void>
}

export { DataSource }
