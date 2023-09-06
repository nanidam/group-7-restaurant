import { useEffect, useState } from "react";
import { getCustomerById } from "../services/customerService";

export function AdminPage() {
  const [customerName, setCustomerName] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      const customerIdJson = await getCustomerById("64f765086436ceddb351a77d");
      if (customerIdJson && customerIdJson.length > 0) {
        setCustomerName(customerIdJson[0].name);
      }
    };

    fetchCustomerData();
  }, [setCustomerName]);

  return (
    <>
      <h1>La Trattoria</h1>
      <section>
        <ul>
          {customerName !== null ? (
            <li> {customerName}</li>
          ) : (
            <li>Loading...</li>
          )}
          <li>test</li>
          <li>test</li>
          <li>test</li>
        </ul>
      </section>
    </>
  );
}
