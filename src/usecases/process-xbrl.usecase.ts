import fs from 'fs'
import path from 'path'
import { XMLParser } from 'fast-xml-parser'

class ProcessXBRLUseCase {
  public async execute(): Promise<void> {
    const filePath = path.join(__dirname, '..', 'template', 'modelo.xml')
    fs.readFile(filePath, (error, data) => {
      const parser = new XMLParser({ ignoreAttributes: false })
      const template = parser.parse(data)
      console.log(Object.keys(template))
    })
  }
}

export { ProcessXBRLUseCase }

// type Structure<T extends string> = Partial<Record<T, Structure<T>>>

// type Exemplo2<T1 extends string, T2 extends string> = `${T1}:${T2}`

// type Exemplo3 = Exemplo2<string, string>
// type Exemplo = Structure<Exemplo3>

// const exemplo: Exemplo = { 'teste:dasdf': { 'test:asdf': 2 } }
