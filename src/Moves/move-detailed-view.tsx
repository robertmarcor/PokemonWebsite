import { UseGetMove } from "@/client/move.client";
import { useParams } from "react-router";
import MoveDetailedViewCard from "./move-detailed-view-card";
import MoveNavigation from "./move-navigation";
import PageWrapper from "@/Components/page-wrapper";

export default function MoveDetailedView() {
  const { id } = useParams();
  const { data: moveData, isLoading, isError } = UseGetMove(id!);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !moveData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p>Error or missing data</p>
      </div>
    );
  }

  return (
    <PageWrapper>
      <MoveDetailedViewCard move={moveData} />
      <MoveNavigation moveId={moveData.id} />
    </PageWrapper>
  );
}
