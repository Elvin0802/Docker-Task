"use client";

import { useEffect, useState } from "react";
import { userService } from "@/services/axios";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [newUsername, setNewUsername] = useState("");
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const data = await userService.getUserData();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameChange = async (e) => {
    e.preventDefault();
    try {
      await userService.changeUsername(newUsername);
      setSuccess("Username updated successfully!");
      fetchUserData();
      setNewUsername("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    try {
      await userService.changePassword(
        passwords.oldPassword,
        passwords.newPassword
      );
      setSuccess("Password updated successfully!");
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-12 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert variant="default" className="mb-4">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="info" className="space-y-4">
          <TabsList>
            <TabsTrigger value="info">Profile Info</TabsTrigger>
            <TabsTrigger value="username">Change Username</TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Username</h3>
                <p>{userData?.username}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Email</h3>
                <p>{userData?.email}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="username">
            <form onSubmit={handleUsernameChange} className="space-y-4">
              <div>
                <label htmlFor="newUsername">New Username</label>
                <Input
                  id="newUsername"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">Update Username</Button>
            </form>
          </TabsContent>

          <TabsContent value="password">
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="oldPassword">Current Password</label>
                <Input
                  id="oldPassword"
                  type="password"
                  value={passwords.oldPassword}
                  onChange={(e) =>
                    setPasswords({ ...passwords, oldPassword: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="newPassword">New Password</label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwords.newPassword}
                  onChange={(e) =>
                    setPasswords({ ...passwords, newPassword: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <Button type="submit">Update Password</Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
