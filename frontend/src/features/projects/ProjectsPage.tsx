import { useMemo, useState } from "react";
import {
  AppBar,
  Container,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
  Pagination,
  Stack,
  Tooltip,
  LinearProgress,
  TableSortLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  useGetProjectsQuery,
  useAddProjectMutation,
  useRefreshProjectMutation,
  useDeleteProjectMutation,
} from "../../services/api";
import { useAppDispatch } from "../../hooks";
import { logout } from "../auth/authSlice";
import ErrorSnackbar from "../../components/ErrorSnackbar";

const PAGE_SIZE = 10;

function formatUnix(ts: number) {
  const iso = new Date(ts * 1000).toISOString();
  return (
    <Tooltip title={iso}>
      <span>{ts}</span>
    </Tooltip>
  );
}

type SortField =
  | "id"
  | "owner"
  | "name"
  | "stars"
  | "forks"
  | "issues"
  | "creation_date";

function getErrorMessage(e: unknown): string {
  const anyE = e as any;
  return anyE?.data?.error || anyE?.error || anyE?.message || "Request failed";
}

export default function ProjectsPage() {
  const [page, setPage] = useState(1);

  const [sortBy, setSortBy] = useState<SortField>("id");
  const [sortAs, setSortAs] = useState<"asc" | "desc">("desc");

  const [path, setPath] = useState("");

  const [refreshId, setRefreshId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [errMsg, setErrMsg] = useState<string | null>(null);
  const closeErr = () => setErrMsg(null);

  const {
    data,
    isFetching,
    error: listError,
  } = useGetProjectsQuery({
    page,
    limit: PAGE_SIZE,
    sort_by: sortBy,
    sort_as: sortAs,
  });

  useMemo(() => {
    if (listError) setErrMsg(getErrorMessage(listError));
  }, [listError]);

  const [addProject, { isLoading: adding }] = useAddProjectMutation();
  const [refreshProject] = useRefreshProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const dispatch = useAppDispatch();

  const handleAdd = async () => {
    const value = path.trim();
    if (!value) return;
    try {
      await addProject({ path: value }).unwrap();
      setPath("");
      setPage(1);
    } catch (e) {
      setErrMsg(getErrorMessage(e));
    }
  };

  const handleRefresh = async (id: string) => {
    try {
      setRefreshId(id);
      await refreshProject({ id }).unwrap();
    } catch (e) {
      setErrMsg(getErrorMessage(e));
    } finally {
      setRefreshId(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeleteId(id);
      await deleteProject({ id }).unwrap();
    } catch (e) {
      setErrMsg(getErrorMessage(e));
    } finally {
      setDeleteId(null);
    }
  };

  const toggleSort = (field: SortField) => {
    setPage(1); 
    if (sortBy === field) {
      setSortAs(sortAs === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortAs("asc");
    }
  };

  const total = data?.total ?? 0;
  const items = data?.items ?? [];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Projects
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => dispatch(logout())}
            title="Logout"
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
        {isFetching && <LinearProgress color="inherit" />}
      </AppBar>

      <Container sx={{ mt: 3 }}>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Stack direction="row" spacing={2}>
            <TextField
              label='Path "owner/repo"'
              size="small"
              fullWidth
              value={path}
              onChange={(e) => setPath(e.target.value)}
            />
            <LoadingButton
              variant="contained"
              onClick={handleAdd}
              loading={adding}
            >
              Add
            </LoadingButton>
          </Stack>
        </Paper>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sortDirection={sortBy === "owner" ? sortAs : false}>
                  <TableSortLabel
                    active={sortBy === "owner"}
                    direction={sortBy === "owner" ? sortAs : "asc"}
                    onClick={() => toggleSort("owner")}
                  >
                    Owner
                  </TableSortLabel>
                </TableCell>

                <TableCell sortDirection={sortBy === "name" ? sortAs : false}>
                  <TableSortLabel
                    active={sortBy === "name"}
                    direction={sortBy === "name" ? sortAs : "asc"}
                    onClick={() => toggleSort("name")}
                  >
                    Repo
                  </TableSortLabel>
                </TableCell>

                <TableCell>URL</TableCell>

                <TableCell
                  align="right"
                  sortDirection={sortBy === "stars" ? sortAs : false}
                >
                  <TableSortLabel
                    active={sortBy === "stars"}
                    direction={sortBy === "stars" ? sortAs : "asc"}
                    onClick={() => toggleSort("stars")}
                  >
                    Stars
                  </TableSortLabel>
                </TableCell>

                <TableCell
                  align="right"
                  sortDirection={sortBy === "forks" ? sortAs : false}
                >
                  <TableSortLabel
                    active={sortBy === "forks"}
                    direction={sortBy === "forks" ? sortAs : "asc"}
                    onClick={() => toggleSort("forks")}
                  >
                    Forks
                  </TableSortLabel>
                </TableCell>

                <TableCell
                  align="right"
                  sortDirection={sortBy === "issues" ? sortAs : false}
                >
                  <TableSortLabel
                    active={sortBy === "issues"}
                    direction={sortBy === "issues" ? sortAs : "asc"}
                    onClick={() => toggleSort("issues")}
                  >
                    Issues
                  </TableSortLabel>
                </TableCell>

                <TableCell
                  align="right"
                  sortDirection={sortBy === "creation_date" ? sortAs : false}
                >
                  <TableSortLabel
                    active={sortBy === "creation_date"}
                    direction={sortBy === "creation_date" ? sortAs : "asc"}
                    onClick={() => toggleSort("creation_date")}
                  >
                    Created (UTC unix)
                  </TableSortLabel>
                </TableCell>

                <TableCell align="center" width={140}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map((p) => {
                const isRefreshing = refreshId === p.id;
                const isDeleting = deleteId === p.id;

                return (
                  <TableRow key={p.id} hover>
                    <TableCell>{p.owner}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>
                      <Link href={p.url} target="_blank" rel="noreferrer">
                        {p.url}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{p.stars}</TableCell>
                    <TableCell align="right">{p.forks}</TableCell>
                    <TableCell align="right">{p.issues}</TableCell>
                    <TableCell align="right">
                      {formatUnix(p.creation_date)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleRefresh(p.id)}
                        title="Refresh"
                        disabled={isRefreshing || isDeleting}
                      >
                        {isRefreshing ? (
                          <LinearProgress sx={{ width: 24 }} />
                        ) : (
                          <RefreshIcon fontSize="small" />
                        )}
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(p.id)}
                        title="Delete"
                        disabled={isDeleting || isRefreshing}
                      >
                        {isDeleting ? (
                          <LinearProgress sx={{ width: 24 }} />
                        ) : (
                          <DeleteIcon fontSize="small" />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}

              {!items.length && !isFetching && (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Typography sx={{ py: 2 }}>No data</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
          <Pagination
            count={Math.max(1, Math.ceil(total / PAGE_SIZE))}
            page={page}
            onChange={(_, p) => setPage(p)}
          />
        </Stack>
      </Container>

      <ErrorSnackbar message={errMsg} onClose={closeErr} />
    </>
  );
}
