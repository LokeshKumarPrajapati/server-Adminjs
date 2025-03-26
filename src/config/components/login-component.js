import React, { useState } from 'react';
import { Box, Button, FormGroup, Label, Input, Text, MessageBox } from '@adminjs/design-system';
import styled from 'styled-components';

const LoginContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
`;

const LoginCard = styled(Box)`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  width: 100%;
  max-width: 400px;
  margin: 0 10px;
`;

const LoginTitle = styled(Text)`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
  color: ${props => props.color || '#333'};
`;

const LoginComponent = (props) => {
  const { action } = props; // Use the `action` prop provided by AdminJS
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(action, { // Use `action` instead of hardcoding the URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      window.location.href = '/admin';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginTitle>Welcome to ZAVE Admin</LoginTitle>
        {error && <MessageBox variant="danger" mb={3}>{error}</MessageBox>}
        <form onSubmit={handleSubmit}>
          <FormGroup mb={3}>
            <Label>Email</Label>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </FormGroup>
          <FormGroup mb={3}>
            <Label>Password</Label>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </FormGroup>
          <Button type="submit" variant="primary" width="100%">
            Login
          </Button>
        </form>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginComponent; // Must use default export