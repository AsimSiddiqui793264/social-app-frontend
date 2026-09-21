import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(
    (state) => state.auth.loading
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(
        login({
          email: data.email,
          password: data.password,
        })
      ).unwrap();

      console.log(
        "Login Response:",
        response
      );

      Swal.fire({
        title: "Login Successful",
        text:
          response?.message ||
          "Login successful",
        icon: "success",
      });

      reset();
      navigate("/home");
    } catch (error) {
      console.log("Login Error:", error);

      Swal.fire({
        title: "Login Failed",
        text:
          error ||
          "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <main className="bg-light py-5">
      <Container>
        <Row className="justify-content-center">
          <Col
            xs={12}
            sm={10}
            md={7}
            lg={5}
            xl={4}
          >
            <Card className="border-0 shadow rounded-4">
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-primary">
                    Welcome Back
                  </h2>

                  <p className="text-muted">
                    Login to your SocialApp account
                  </p>
                </div>

                <Form
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      Email
                    </Form.Label>

                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      autoComplete="email"
                      className="py-2 rounded-3"
                      {...register("email", {
                        required:
                          "Email is required",
                      })}
                      isInvalid={!!errors.email}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.email?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      Password
                    </Form.Label>

                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      autoComplete="current-password"
                      className="py-2 rounded-3"
                      {...register("password", {
                        required:
                          "Password is required",
                      })}
                      isInvalid={
                        !!errors.password
                      }
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.password?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    className="w-100 py-2 rounded-3 fw-bold"
                  >
                    {loading
                      ? "Logging in..."
                      : "Login"}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <span className="text-muted">
                    Don't have an account?{" "}
                  </span>

                  <Link
                    to="/signup"
                    className="fw-bold text-primary text-decoration-none"
                  >
                    Create Account
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Login;
