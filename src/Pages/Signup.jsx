import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

const Signup = () => {
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
      const formData = new FormData();

      formData.append("fullName", data.fullName);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("avatar", data.avatar[0]);

      const response = await axios.post(
        "http://localhost:5000/api/v1/users/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("Signup Response:", response.data);
      alert(response.data.message);
      Swal.fire({
        title: "Congratulation",
        text: response.data.message,
        icon: "success",
      });

      reset();
    } catch (error) {
      console.log("Signup Error:", error.response?.data?.message);

      Swal.fire({
        title: "Oops! Error",
        text: error.response?.data?.message || "Something went wrong",
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
                    <h2 className="fw-bold text-primary">Create Account</h2>

                    <p className="text-muted">Join our social community</p>
                  </div>

                  <Form onSubmit={handleSubmit(onSubmit)}>
                    {/* Full Name */}
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Full Name</Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Enter your full name"
                        className="py-2 rounded-3"
                        {...register("fullName", {
                          required: "Full name is required",
                          minLength: {
                            value: 3,
                            message: "Minimum 3 characters",
                          },
                        })}
                        isInvalid={!!errors.fullName}
                      />

                      <Form.Control.Feedback type="invalid">
                        {errors.fullName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Username */}
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Username</Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                        className="py-2 rounded-3"
                        {...register("username", {
                          required: "Username is required",
                          minLength: {
                            value: 3,
                            message: "Minimum 3 characters",
                          },
                        })}
                        isInvalid={!!errors.username}
                      />

                      <Form.Control.Feedback type="invalid">
                        {errors.username?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Email */}
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Email</Form.Label>

                      <Form.Control
                        type="email"
                        placeholder="Enter email"
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
                      <Form.Label className="fw-semibold">Password</Form.Label>

                      <Form.Control
                        type="password"
                        placeholder="Create password"
                        autoComplete="new password"
                        className="py-2 rounded-3"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Minimum 6 characters",
                          },
                        })}
                        isInvalid={!!errors.password}
                      />

                      <Form.Control.Feedback type="invalid">
                        {errors.password?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Avatar */}
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">
                        Profile Picture
                      </Form.Label>

                      <Form.Control
                        type="file"
                        accept="image/*"
                        className="py-2 rounded-3"
                        {...register("avatar", {
                          required: "Profile picture is required",
                        })}
                        isInvalid={!!errors.avatar}
                      />

                      <Form.Control.Feedback type="invalid">
                        {errors.avatar?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Submit */}
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={loading}
                      className="w-100 py-2 rounded-3 fw-bold"
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </Form>

                  <div className="text-center mt-4">
                    <span className="text-muted">
                      Already have an account?{" "}
                    </span>

                    <Link
                      to="/login"
                      className="fw-bold text-primary text-decoration-none"
                    >
                      Login
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

export default Signup;
