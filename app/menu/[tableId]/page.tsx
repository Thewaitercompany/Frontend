import { Suspense } from "react";
import dynamic from "next/dynamic";
// import LoadingAnimations from "@/components/LoadingAnimations";

const MenuContent = dynamic(() => import("@/components/MenuContent"), {
  // loading: () => <LoadingAnimations />,
});

interface PageProps {
  params: Promise<{
    tableId: string;
  }>;
}

export default async function MenuPage({ params }: PageProps) {
  const resolvedParams = await params;

  return (
    // <Suspense fallback={<LoadingAnimations />}>
    <Suspense fallback={null}>
      <MenuContent tableId={resolvedParams.tableId} />
    </Suspense>
  );
}

export async function generateStaticParams() {
  // In a real application, you would fetch this data from an API or database
  const tables = ["1", "2", "3", "4", "5"];

  return tables.map((tableId) => ({
    tableId: tableId,
  }));
}
