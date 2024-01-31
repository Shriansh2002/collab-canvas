"use client";
import React from "react";
import { useOrganizationList } from "@clerk/nextjs";
import { Item } from "./item";

const List = () => {
	const { userMemberships } = useOrganizationList({
		userMemberships: {
			infinite: true,
		},
	});

	if (!userMemberships.data?.length) return null;

	return (
		<ul className='space-y-4'>
			{userMemberships.data.map((membership) => (
				<Item
					key={membership.id}
					id={membership.organization.id}
					name={membership.organization.name}
					imageUrl={membership.organization.imageUrl}
				/>
			))}
		</ul>
	);
};

export default List;
