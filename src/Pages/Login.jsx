import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login Response:", response.data.message);

      Swal.fire({
        title: "Login Successful",
        text: response.data.message,
        icon: "success",
      });

      reset();

    } catch (error) {
      console.log(
        "Login Error:",
        error.response?.data?.message || error.message
      );

      Swal.fire({
        title: "Login Failed",
        text:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong",
        icon: "error",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="bg-light py-5">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={7} lg={5} xl={4}>
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

                  <Form onSubmit={handleSubmit(onSubmit)}>

                    {/* Email */}
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
                          required: "Email is required",
                        })}
                        isInvalid={!!errors.email}
                      />

                      <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Password */}
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
                          required: "Password is required",
                        })}
                        isInvalid={!!errors.password}
                      />

                      <Form.Control.Feedback type="invalid">
                        {errors.password?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    
                    {/* Login Button */}
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={loading}
                      className="w-100 py-2 rounded-3 fw-bold"
                    >
                      {loading ? "Logging in..." : "Login"}
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
    </>
  );
};

export default Login;