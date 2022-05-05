import React, { useState } from "react";
import { SearchPanel } from "screens/project-list/search-panel";
import { List } from "screens/project-list/list";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { useProjece } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useProjectsSearchParams } from "./utils";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectsSearchParams();
  const { isloading, error, data: list } = useProjece(useDebounce(param, 200));
  const { data: users } = useUsers();
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <List loading={isloading} users={users || []} dataSource={list || []} />
    </Container>
  );
};
ProjectListScreen.whyDidYouRender = true;
const Container = styled.div`
  padding: 3.2rem;
`;
