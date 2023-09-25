const getResponseObj = (primaryObj?: any, secondaryObj?: any) => {
  const responseData = {
    contact: {
      primaryContatctId: primaryObj[0]?.id || null,
      emails: !!primaryObj[0]?.email ? [primaryObj[0]?.email] : [],
      phoneNumbers: !!primaryObj[0]?.phoneNumber
        ? [primaryObj[0]?.phoneNumber]
        : [],
      secondaryContactIds: [],
    },
  };
  if (secondaryObj?.length > 0) {
    responseData.contact.emails = [
      ...new Set([
        ...responseData.contact.emails,
        ...secondaryObj?.map((o) => o.email),
      ]),
    ];
    responseData.contact.phoneNumbers = [
      ...new Set([
        ...responseData.contact.phoneNumbers,
        ...secondaryObj?.map((o) => o.phoneNumber),
      ]),
    ];
    responseData.contact.secondaryContactIds = [
      ...new Set([
        ...responseData.contact.secondaryContactIds,
        ...secondaryObj?.map((o) => o.id),
      ]),
    ];
  }

  return responseData;
};

export default getResponseObj;
