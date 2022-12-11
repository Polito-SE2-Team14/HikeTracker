import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { Loading } from "../components/Loading";
import HikeListTable from "../components/HikeList/HikeListTable";
import HikeAPI from "../api/HikeAPI";
import UserAPI from "../api/UserAPI";
import { Container, Row } from "react-bootstrap";

export function HomePage() {

	return (<Navigate to="/hikes" />);
}
