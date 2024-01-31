"use client";
import { NextPage } from "next";
import EmptyOrg from "./_components/empty-org";
import { useOrganization } from "@clerk/nextjs";
import BoardList from "./_components/board-list";
import { DashboardPageProps } from "@/types";

const DashboardPage: NextPage<DashboardPageProps> = ({
	searchParams,
}) => {
	const { organization } = useOrganization();

	return (
		<div className='flex-1 h-[calc(100%-80px)] p-6'>
			{!organization ? (
				<EmptyOrg />
			) : (
				<BoardList
					orgId={organization.id}
					query={searchParams}
				/>
			)}
		</div>
	);
};

export default DashboardPage;
