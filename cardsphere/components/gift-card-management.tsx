"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function GiftCardManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [giftCards] = useState([
    { id: "0x1a2b3c", name: "Coffee Lovers", value: 25, sold: 120, active: 85 },
    { id: "0x4d5e6f", name: "Premium Coffee", value: 50, sold: 75, active: 62 },
    { id: "0x7g8h9i", name: "Coffee Bundle", value: 100, sold: 30, active: 28 },
    { id: "0xj0k1l2", name: "Quick Coffee", value: 10, sold: 200, active: 145 },
  ])

  return (
    <div>
      <Tabs defaultValue="active">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="active">Active Templates</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Create New</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Gift Card Template</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Gift Card Name</Label>
                  <Input id="name" placeholder="e.g. Premium Coffee" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="value">Value ($)</Label>
                  <Input id="value" type="number" placeholder="25" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Gift card description" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input id="image" placeholder="https://..." />
                </div>
                <Button className="w-full mt-2" onClick={() => setIsDialogOpen(false)}>
                  Create Gift Card
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="active">
          <div className="grid grid-cols-1 gap-4">
            {giftCards.map((card) => (
              <Card key={card.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                      <div>
                        <h4 className="font-medium">{card.name}</h4>
                        <p className="text-sm text-gray-500">${card.value.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-gray-500">Sold</p>
                        <p className="font-medium">{card.sold}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Active</p>
                        <p className="font-medium">{card.active}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drafts">
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No draft gift card templates</p>
            <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
              Create New Template
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="archived">
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No archived gift card templates</p>
            <Button variant="outline">View All Templates</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
