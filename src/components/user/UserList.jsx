import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export default function userList(){
  return (
    <>
    <div className="w-full">
      <Card className="mx-5 mt-10 shadow-md border-0 bg-white">
        <CardHeader>
          <CardTitle className={'text-start'}>Users</CardTitle>
          <CardDescription className={'text-start'} >Users Information</CardDescription>
          <CardAction>
            <Button variant="outline">New User</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Email</TableHead>
                <TableHead>Firstname</TableHead>
                <TableHead>Lastname</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">{invoice.invoice}</TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="">Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
        <CardFooter className="flex-col gap-2">
        </CardFooter>
      </Card>
    </div>
    </>
  )
}
