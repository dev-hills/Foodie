import Accordion from "../../Components/Accordion";
import Navbar from "../../Components/Navbar";

const Faq = () => {
  const faq = [
    {
      title: "Can I modify or cancel my order after it's been placed?",
      description:
        "Once an order is placed, modifications or cancellations may not be possible. Please contact our customer support team immediately for assistance",
    },
    {
      title: "Do you offer discounts for bulk orders?",
      description:
        "Yes, we offer discounts for bulk orders. Please contact our sales team for more information and personalized quotes",
    },
    {
      title: "Is my payment information secure?",
      description:
        "Yes, we take security seriously. All payment information is encrypted and processed securely to protect your personal data",
    },
    {
      title: "What payment methods do you accept?",
      description:
        "We accept all major credit cards, debit cards, and PayPal for online payments. Cash on delivery (COD) option is also available in select areas.",
    },
    {
      title: "Can I track my delivery?",
      description:
        "Yes, you will receive a tracking link via email or SMS once your order is dispatched. You can use this link to track the status of your delivery in real-time",
    },
    {
      title: "How much does delivery cost?",
      description:
        "Delivery fees vary depending on your location and order size. You can view the delivery fee for your area at checkout before placing your order.",
    },
    {
      title: "Is there a minimum order requirement?",
      description:
        "Our website does not have a minimum order requirement, but some items may have minimum quantity restrictions",
    },
    {
      title: "How do I place an order?",
      description:
        "Simply browse our website, select the items you'd like to order, and proceed to checkout. You can also use our mobile app for a seamless ordering experience.",
    },
  ];
  return (
    <div>
      <Navbar />

      <div className="pt-[130px] flex flex-col items-center">
        <h1 className="font-poppins font-extrabold text-[35px] text-center">
          Frequently Asked Questions
        </h1>

        <div className="mt-[20px] mb-[100px] flex flex-col gap-[20px]">
          {faq.map((item, idx) => (
            <Accordion
              key={idx}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
