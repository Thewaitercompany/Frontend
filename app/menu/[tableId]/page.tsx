import { Suspense } from "react"
import dynamic from "next/dynamic"
import LoadingAnimations from "@/components/LoadingAnimations"

const MenuContent = dynamic(() => import("@/components/MenuContent"), {
  loading: () => <LoadingAnimations />,
})

interface PageProps {
  params: {
    tableId: string
  }
}

export default function MenuPage({ params }: PageProps) {
  return (
    <Suspense fallback={<LoadingAnimations />}>
      <MenuContent tableId={params.tableId} />
    </Suspense>
  )
}

export async function generateStaticParams() {
  // In a real application, you would fetch this data from an API or database
  const tables = ["1", "2", "3", "4", "5"]

  return tables.map((tableId) => ({
    tableId: tableId,
  }))
}

