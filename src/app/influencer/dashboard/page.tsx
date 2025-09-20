"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { UploadButton } from "@/utils/uploadthing";

export default function InfluencerDashboard() {
  const [videos, setVideos] = useState([
    {
      id: 1,
      caption: "My festive outfit look ✨",
      products: ["Kurti Set", "Earrings"],
      views: 12500,
      likes: 940,
      conversions: 120,
    },
    {
      id: 2,
      caption: "Casual denim haul 👖",
      products: ["Denim Jeans"],
      views: 8200,
      likes: 610,
      conversions: 80,
    },
  ]);

  const analyticsData = videos.map((v, i) => ({
    name: `Video ${i + 1}`,
    Views: v.views,
    Likes: v.likes,
    Conversions: v.conversions,
  }));

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold">Influencer Dashboard</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Upload New Video</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Upload New Video</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <UploadButton
                  endpoint="videoUploader"
                  onClientUploadComplete={(res) => {
                    console.log("Uploaded:", res[0].ufsUrl);
                  }}
                  onUploadError={(error: Error) => {
                    console.error(error);
                  }}
                  className="mt-4"
                  appearance={{
                    button: "bg-blue-500 hover:bg-blue-600 p-4 text-white",
                    allowedContent: "text-sm text-gray-500",
                  }}
                />
              </div>
              <div>
                <Label>Caption</Label>
                <Textarea placeholder="Write a catchy caption..." />
              </div>
              <div>
                <Label>Tag Products</Label>
                <Input placeholder="Search and tag products..." />
              </div>
              <Button className="w-full">Publish</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="Views" stroke="#8884d8" />
              <Line type="monotone" dataKey="Likes" stroke="#82ca9d" />
              <Line type="monotone" dataKey="Conversions" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Previous Shorts</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video.id}
              className="border rounded-lg p-4 shadow-sm space-y-2"
            >
              <div className="bg-gray-200 h-32 flex items-center justify-center text-gray-500">
                🎬 Video {video.id}
              </div>
              <p className="font-medium">{video.caption}</p>
              <p className="text-sm text-muted-foreground">
                Tagged: {video.products.join(", ")}
              </p>
              <div className="flex justify-between text-sm mt-2">
                <span>👁️ {video.views}</span>
                <span>❤️ {video.likes}</span>
                <span>💰 {video.conversions}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
