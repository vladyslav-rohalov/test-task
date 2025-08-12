import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Tab,
  Tabs,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useLoginMutation, useRegisterMutation } from "../../services/api";
import { useAppDispatch } from "../../hooks";
import { setToken } from "./authSlice";
import { useNavigate } from "react-router-dom";

type FormValues = { email: string; password: string };

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, { isLoading: lLoading, error: lError }] = useLoginMutation();
  const [registerReq, { isLoading: rLoading, error: rError }] =
    useRegisterMutation();

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    const req = tab === "login" ? login : registerReq;
    const res = await req(data).unwrap();
    dispatch(setToken(res.token));
    navigate("/projects", { replace: true });
  };

  const err = (tab === "login" ? lError : rError) as any;

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            GitHub CRM
          </Typography>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
            <Tab label="Login" value="login" />
            <Tab label="Register" value="register" />
          </Tabs>

          {err?.data?.error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {String(err.data.error)}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Email"
              fullWidth
              type="email"
              sx={{ mb: 2 }}
              {...register("email", { required: true })}
            />
            <TextField
              label="Password"
              fullWidth
              type="password"
              sx={{ mb: 2 }}
              {...register("password", { required: true })}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={lLoading || rLoading}
            >
              {tab === "login" ? "Login" : "Register"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
