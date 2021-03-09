import { PageLayout } from 'src/components/page-layout'

const Index: React.FC = () => {
  return (
    <PageLayout
      header={
        <header className="py-10 pl-10 bg-black text-white">
          <div className="uppercase font-bold">Athenaeum NEXT</div>
        </header>
      }
      main={<main>main</main>}
      footer={
        <footer className="p-10 bg-black text-white">
          <div className="uppercase font-bold">footer</div>
        </footer>
      }
    />
  )
}

export default Index
