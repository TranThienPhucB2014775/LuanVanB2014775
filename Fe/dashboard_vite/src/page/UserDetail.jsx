import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

import { Container } from "react-bootstrap";
import PageHeading from "../components/PageHeading";
import ProfileHeader from "../components/ProfileHeader";
import { getUser } from "../api/user.api";
import useHttp from "../hooks/useHttp";
export default function UserDetail() {
  const { id } = useParams();

  const { data: user, isLoading, error, sendRequest } = useHttp(getUser, {});

  useEffect(() => {
    async function fetchData() {
      await sendRequest({ id: id });
    }
    fetchData();
  }, []);

  return (
    <Container fluid className="p-3">
      {/* Page Heading */}
      <PageHeading heading="Overview" />

      {/* Profile Header  */}
      <ProfileHeader user={user} />
      <div className="py-6">
        <Outlet context={{ user }} />
      </div>
    </Container>
  );
}
