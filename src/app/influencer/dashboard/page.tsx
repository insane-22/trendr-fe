"use client";

import { useState, useEffect } from "react";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
} from "recharts";
import { UploadButton } from "@/utils/uploadthing";
import axios from "axios";
import toast from "react-hot-toast";

export default function InfluencerDashboard() {
  const [caption, setCaption] = useState("");
  const [products, setProducts] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/videos/", {
          params: { username: "riya" },
        });
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, []);

  const analyticsData = videos.map((v: any, i: number) => {
    const coins = Math.floor((v.likes || 0) / 10) * 2;
    return {
      name: `Video ${i + 1}`,
      Likes: v.likes,
      Coins: coins,
    };
  });

  const totalCoins = analyticsData.reduce((sum, d) => sum + d.Coins, 0);

  const handlePublish = async () => {
    try {
      const payload = {
        username: "riya",
        video_url: videoUrl,
        caption: caption,
        products: [1, 2],
      };

      const res = await axios.post(
        "http://localhost:8000/api/videos/create_reel/",
        payload
      );

      setVideos((prev) => [res.data, ...prev]);
      setOpen(false);

      toast("Upload Successful 🎉");

      setCaption("");
      setProducts([]);
      setVideoUrl("");
    } catch (err) {
      console.error(err);
      toast("Upload Failed ❌");
    }
  };

  interface Product {
    id: number;
    name: string;
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold">Influencer Dashboard</h1>
        <Dialog open={open} onOpenChange={setOpen}>
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
                    setVideoUrl(res[0].ufsUrl);
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
                <Textarea
                  placeholder="Write a catchy caption..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
              <div>
                <Label>Tag Products</Label>
                <Input
                  placeholder="Enter product IDs (comma separated)"
                  value={products.join(", ")}
                  onChange={(e) =>
                    setProducts(e.target.value.split(",").map((p) => p.trim()))
                  }
                />
              </div>
              <Button className="w-full" onClick={handlePublish}>
                Publish
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-[#9C27B0] hover:bg-[#7B1FA2] transition text-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl flex items-center gap-2">
            Total Coins Earned :D
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-5 w-5 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>🪙 You earn 2 coins for every 10 likes ❤️</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">🪙 {totalCoins}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Overview (Likes vs Coins)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Line type="monotone" dataKey="Likes" stroke="#82ca9d" />
              <Line type="monotone" dataKey="Coins" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Previous Shorts</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, index) => {
            const coins = Math.floor((video.likes || 0) / 10) * 2;
            return (
              <div
                key={video.id || index}
                className="border rounded-lg p-4 shadow-sm space-y-2"
              >
                <div className="bg-gray-200 h-32 flex items-center justify-center text-gray-500">
                  🎬 Video
                </div>
                <p className="font-medium">{video.caption}</p>
                <p className="text-sm text-muted-foreground">
                  Tagged:{" "}
                  {video.products?.map((p: Product) => p.name).join(", ") ||
                    "None"}
                </p>
                <div className="flex justify-between text-sm mt-2">
                  <span>❤️ {video.likes}</span>
                  <span>🪙 {coins} coins</span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
