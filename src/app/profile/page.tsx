"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import API from "@/utils/api"; // Axios instance pointing to backend with JWT headers
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get("access_token");
      if (!token) {
        router.push("/login"); // redirect if not logged in
        return;
      }

      try {
        const res = await API.get("/api/profile/");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        router.push("/login"); // redirect if token invalid
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    router.push("/login");
  };

  if (loading) return <p className="text-center mt-20">Loading profile...</p>;
  if (!user) return null;

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      {/* Profile Header */}
      <Card className="mb-6 shadow-lg">
        <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar || ""} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-muted-foreground text-sm">{user.email}</p>
              <p className="text-muted-foreground text-sm">{user.address}</p>
            </div>
          </div>
          <Button className="w-full sm:w-auto">Edit Profile</Button>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="flex w-full overflow-x-auto rounded-lg no-scrollbar">
          <TabsTrigger value="profile" className="flex-1 px-4 py-2 text-sm">
            Profile Info
          </TabsTrigger>
          <TabsTrigger value="security" className="flex-1 px-4 py-2 text-sm">
            Security
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex-1 px-4 py-2 text-sm">
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* Profile Info */}
        <TabsContent value="profile">
          <Card className="shadow-md">
            <CardContent className="p-6 space-y-4 text-sm sm:text-base">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>

              <div className="mt-6 border-t pt-4">
                <h3 className="font-semibold text-base sm:text-lg mb-3">
                  Influencer Account
                </h3>
                {!user.is_influencer ? (
                  <div className="space-y-3">
                    <p className="text-muted-foreground text-sm sm:text-base">
                      You don’t have an influencer account yet.
                    </p>
                    <Link href="/influencer/setup">
                      <Button className="w-full sm:w-auto">
                        Setup Influencer Account
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <span className="text-green-600 font-medium text-sm sm:text-base">
                      ✅ Influencer Account Active
                    </span>
                    <Link href="/influencer/dashboard">
                      <Button variant="outline" className="w-full sm:w-auto">
                        Go to Dashboard
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card className="shadow-md">
            <CardContent className="p-6 space-y-3">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              <Button variant="outline" className="w-full">
                Enable 2FA
              </Button>
              <p className="text-sm text-muted-foreground">
                Last login: {user.last_login || "N/A"}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences">
          <Card className="shadow-md">
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <p>Theme</p>
                <Button variant="outline" className="w-full sm:w-auto">
                  Toggle Dark/Light
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <p>Notifications</p>
                <Button variant="outline" className="w-full sm:w-auto">
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Logout */}
      <div className="mt-6 mb-16 flex justify-center">
        <Button
          variant="destructive"
          className="w-full sm:w-auto"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
