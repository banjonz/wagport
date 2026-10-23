// Learn articles. Every factual claim comes from a listed source; keep it that way.
// Section shape: { h, p?: [..], list?: [..], table?: { head: [..], rows: [[..]] } }

const SRC = {
  govuk: { title: 'GOV.UK: Bringing your pet to Great Britain', url: 'https://www.gov.uk/bring-pet-to-great-britain' },
  govukDoc: { title: 'GOV.UK: Which pet travel document you need', url: 'https://www.gov.uk/bring-pet-to-uk/which-pet-travel-document' },
  govukCert: { title: 'GOV.UK: Great Britain pet health certificate', url: 'https://www.gov.uk/bring-pet-to-great-britain/great-britain-pet-health-certificate' },
  euEntry: { title: 'European Commission: Bringing a pet into the EU from a non-EU country', url: 'https://food.ec.europa.eu/animals/live-animal-movements/dogs-cats-and-ferrets/bringing-pet-eu-non-eu-country_en' },
  euList: { title: 'European Commission: Listing of non-EU countries', url: 'https://food.ec.europa.eu/animals/live-animal-movements/dogs-cats-and-ferrets/listing-territories-and-non-eu-countries_en' },
  cdcList: { title: 'CDC: High-risk countries for dog rabies', url: 'https://www.cdc.gov/importation/dogs/high-risk-countries.html' },
  cdcForeign: { title: 'CDC: Foreign-vaccinated dogs from high-risk countries', url: 'https://www.cdc.gov/importation/dogs/foreign-vaccinated-high-risk-countries.html' },
  daffGuides: { title: 'DAFF: Step-by-step guides and country groups', url: 'https://www.agriculture.gov.au/cats-dogs/step-by-step-guides' },
  daffRabies: { title: 'DAFF: Rabies vaccination and tests', url: 'https://www.agriculture.gov.au/cats-dogs/rabies-neutralising-antibody' },
  daffFaq: { title: 'DAFF: Cats and dogs FAQ', url: 'https://agriculture.gov.au/cats-dogs/frequently-asked-questions' },
  daffFees: { title: 'DAFF: Fees for government quarantine facilities', url: 'https://www.agriculture.gov.au/cats-dogs/quarantine-facilities-and-fees/fees-for-government-animal-quarantine-faciltities' },
  mpiIhs: { title: 'MPI: Import Health Standard Cats and Dogs 2026', url: 'https://www.mpi.govt.nz/dmsdocument/71909-Cats-and-Dogs-2026-Import-Health-Standard' },
  mpiPage: { title: 'MPI: Bringing cats and dogs to NZ', url: 'https://www.mpi.govt.nz/bring-send-to-nz/pets-travelling-to-nz/bringing-cats-and-dogs-to-nz' },
  gnCosts: { title: 'Gulf News: what it costs to own and relocate a pet in the UAE', url: 'https://gulfnews.com/amp/your-money/community-tips/uae-own-a-pet-or-planning-on-getting-one-heres-how-much-it-costs-and-how-to-plan-your-finances-1.1617293962639' },
  gnK9: { title: 'Gulf News: K9 Jets Dubai–London service and relocator pricing', url: 'https://gulfnews.com/amp/story/business%2Faviation%2Fpay-per-seat-private-jet-charter-service-for-pets-k9-jets-to-launch-dubai-london-service-in-september-1.96992708' },
};

const UPDATED = '2026-10-23';

const articles = [
  {
    slug: 'cost-to-move-dog-dubai-to-uk',
    title: 'How much does it cost to move a dog from Dubai to the UK?',
    description: 'Published price ranges for moving a dog from the UAE to the UK, what drives the cost, and what you can do yourself.',
    route: 'GB',
    lead: 'Published estimates for a full-service move from Dubai to the UK run from about Dh6,600 to Dh13,600, depending mostly on the size of your dog. Get current quotes, because these figures are from published articles, not live prices.',
    sections: [
      { h: 'Published price ranges', table: { head: ['Option', 'Published cost', 'Source'], rows: [
        ['Dubai relocator to the UK (Manchester), by dog size', 'Dh6,600–13,600', 'Gulf News, quoting a Dubai relocator'],
        ['UAE relocation companies, general range', 'Dh9,000–16,000', 'Gulf News'],
        ['Private pet jet, Dubai–London, one passenger + one large dog', 'US$9,925 (Dh36,455)', 'Gulf News, K9 Jets launch'],
      ] } },
      { h: 'What drives the price', list: [
        'Crate size: dogs to the UK fly as cargo, and airlines charge by the size and weight of the crate.',
        'Your dog\'s paperwork: if the microchip and rabies vaccine are already valid, the vet work is shorter.',
        'Service level: door-to-door handling, boarding and customs clearance at both ends add cost.',
      ] },
      { h: 'Why the UK is one of the cheaper routes', p: [
        'The UAE is a listed country for Great Britain, so your dog does not need a rabies blood test and there is no quarantine if the rules are met. You need a microchip, a rabies vaccine at least 21 days before travel, a Great Britain pet health certificate issued within 10 days of arrival, and a tapeworm treatment 1 to 5 days before arrival.',
      ] },
    ],
    sources: [SRC.gnCosts, SRC.gnK9, SRC.govuk, SRC.govukDoc],
  },
  {
    slug: 'cost-to-move-dog-dubai-to-australia',
    title: 'How much does it cost to move a dog from Dubai to Australia?',
    description: 'Published relocation costs from the UAE to Australia, plus the official Mickleham quarantine fees.',
    route: 'AU',
    lead: 'Australia is the most expensive common route out of the UAE. Published estimates for a full-service move run from about Dh19,200 to Dh31,750 depending on dog size, and the government quarantine fees alone start at about AUD 1,877.',
    sections: [
      { h: 'Published relocation estimates', p: [
        'A Dubai relocator quoted Dh19,200–31,750 for Australia in Gulf News, with size the main factor. Treat it as a guide and ask for current quotes.',
      ] },
      { h: 'Official quarantine fees at Mickleham (one dog)', table: { head: ['Fee', 'AUD'], rows: [
        ['Reservation charge', '269'],
        ['Importation charge', '1,078'],
        ['10 days accommodation (with identity check)', '530'],
        ['30 days accommodation (without identity check)', '1,590'],
        ['Each extra day', '53'],
      ] } },
      { h: 'How to keep quarantine at 10 days', p: [
        'Dogs from Group 3 countries like the UAE do a minimum of 30 days in quarantine. An identity check by a government vet before the rabies blood test cuts that to a minimum of 10 days, saving AUD 1,060 in accommodation alone. The import permit application has its own separate fee.',
      ] },
    ],
    sources: [SRC.gnCosts, SRC.daffFees, SRC.daffRabies],
  },
  {
    slug: 'how-long-to-move-dog-from-uae',
    title: 'How long does it take to move a dog out of the UAE?',
    description: 'Minimum preparation time from the UAE to the UK, EU, USA, Canada, Australia, New Zealand and Russia, side by side.',
    lead: 'Anything from about 10 days to more than 7 months, depending on where you are going and whether your dog\'s rabies vaccine is already valid. Australia and New Zealand need the longest runway.',
    sections: [
      { h: 'Minimum lead time by destination', table: { head: ['Destination', 'From scratch', 'Already vaccinated', 'Why'], rows: [
        ['United Kingdom', 'about 25 days', 'about 10 days', '21-day wait after rabies vaccine; health certificate within 10 days'],
        ['European Union', 'about 25 days', 'about 10 days', '21-day wait; EU health certificate within 10 days'],
        ['Russia', 'about 21 days', 'about 14 days', 'Rabies vaccine at least 20 days before; vet exam within 14 days'],
        ['Canada', 'about 30 days', 'about 7 days', 'Rabies certificate needed; no official wait found, so we plan a buffer'],
        ['United States', 'about 58 days', 'about 28 days', 'UAE is CDC high-risk: titer test at least 28 days before arrival'],
        ['New Zealand', 'about 6+ months', 'about 6+ months', 'Official microchip check at least 6 months before shipment'],
        ['Australia', 'about 7 months', 'about 6 months', 'Export at least 180 days after the rabies blood sample reaches the lab'],
      ] } },
      { h: 'The mistake that costs the most time', p: [
        'Starting late on a long route. For Australia and New Zealand the clock is set by the rabies blood test and official checks, and nothing can speed it up. If there is any chance you will move there, start the vet steps as soon as you can.',
      ] },
    ],
    sources: [SRC.govuk, SRC.euEntry, SRC.cdcForeign, SRC.daffRabies, SRC.mpiIhs],
  },
  {
    slug: 'rabies-titer-test-uae-dogs',
    title: 'Does my dog need a rabies titer test to leave the UAE?',
    description: 'Which destinations need a rabies antibody (titer) blood test for dogs from the UAE, and when to take it.',
    lead: 'Only for some destinations. The UK, the EU, Canada and Russia do not need one for dogs coming from the UAE. Australia, New Zealand and the United States do, and the timing matters.',
    sections: [
      { h: 'Titer test by destination', table: { head: ['Destination', 'Titer test needed?', 'Timing rule'], rows: [
        ['United Kingdom', 'No', 'UAE is a listed country'],
        ['European Union', 'No', 'UAE is on the EU list of countries exempt from the test'],
        ['United States', 'Yes, to avoid 28-day quarantine', 'Drawn at least 30 days after first vaccine and at least 28 days before arrival; CDC-approved lab'],
        ['Australia (RNATT)', 'Yes', 'Export at least 180 days after the sample reaches the lab; valid 12 months from collection'],
        ['New Zealand (RNATT)', 'Yes', 'Sample 3 to 12 months before shipment; result at least 0.5 IU/mL'],
      ] } },
      { h: 'Before the blood draw', list: [
        'The microchip must be in before the rabies vaccine, and its number must match every document.',
        'For Australia, book the government identity check before the blood draw to qualify for 10-day quarantine.',
        'For New Zealand, the official microchip check has its own timing rules under the 2026 standard.',
      ] },
    ],
    sources: [SRC.govukDoc, SRC.euList, SRC.cdcForeign, SRC.daffRabies, SRC.daffFaq, SRC.mpiIhs],
  },
  {
    slug: 'uae-cdc-high-risk-dogs-usa',
    title: 'Taking a dog from the UAE to the USA: the CDC high-risk rules',
    description: 'The UAE is on the CDC high-risk list for dog rabies. What that means for your dog, step by step.',
    route: 'US',
    lead: 'The CDC lists the UAE as a high-risk country for dog rabies, so dogs vaccinated in the UAE face the strictest US entry rules. Plan on about two months from scratch.',
    sections: [
      { h: 'What the CDC requires', list: [
        'Dog at least 6 months old on arrival, microchipped before its rabies vaccine.',
        'A Certification of Foreign Rabies Vaccination and Microchip form, completed by your vet and endorsed by an official government vet, no more than 30 days before travel.',
        'A rabies titer from a CDC-approved lab, drawn at least 30 days after the first valid vaccine and at least 28 days before arrival. Without it, your dog does 28 days of quarantine.',
        'A reservation at a CDC-registered animal care facility for an exam and revaccination, and a flight straight into that airport.',
        'A CDC Dog Import Form receipt, completed online for the exact arrival date and airport.',
      ] },
      { h: 'Most common trap', p: [
        'Booking a flight into an airport without a CDC-registered animal care facility, or connecting onward inside the US before the dog has been seen there. Domestic connections are not allowed until those services are done.',
      ] },
    ],
    sources: [SRC.cdcList, SRC.cdcForeign],
  },
  {
    slug: 'new-zealand-2026-dog-import-rules',
    title: 'New Zealand\'s 2026 dog import rules: what changed',
    description: 'MPI\'s Cats and Dogs 2026 Import Health Standard explained for owners moving a dog from the UAE.',
    route: 'NZ',
    lead: 'New Zealand brought in a new import standard on 1 July 2026. The big change is an official microchip check at least six months before shipment, required for every import from 1 April 2027.',
    sections: [
      { h: 'Key dates', table: { head: ['Date', 'What happens'], rows: [
        ['12 May 2026', 'New Import Health Standard issued'],
        ['1 July 2026', 'Standard in force; old 2021 rules still accepted during transition'],
        ['1 October 2026', 'Pre-export identity checks start being required for imports from April 2027'],
        ['1 April 2027', 'All cats and dogs must meet the 2026 standard'],
      ] } },
      { h: 'The rabies and ID check rules (rabies-controlled countries)', list: [
        'Rabies vaccine at 12 weeks or older, continuously valid; a first vaccination must be at least 6 months before shipment.',
        'Rabies blood test sample taken 3 to 12 months before shipment, result at least 0.5 IU/mL.',
        'Official vet microchip scan: before the blood sample if it is taken 6 to 12 months out; if taken 3 to 6 months out, one scan at least 6 months before shipment and a second before the sample.',
      ] },
      { h: 'The final month', list: [
        'Two external parasite treatments and two internal parasite treatments in set windows.',
        'Blood tests within 30 days of shipment, including Babesia gibsoni and Leishmania, plus Brucella canis for entire dogs.',
        'Vet inspection within 2 days of shipment, arrival as cargo into Auckland or Christchurch only, and at least 10 days in quarantine.',
      ] },
    ],
    sources: [SRC.mpiPage, SRC.mpiIhs],
  },
  {
    slug: 'australia-180-day-rule-quarantine',
    title: 'Australia\'s 180-day rule and quarantine, explained',
    description: 'Why moving a dog from the UAE to Australia takes about seven months, and how to keep quarantine to 10 days.',
    route: 'AU',
    lead: 'The UAE is an approved Group 3 country for Australia. That means your dog can go direct, but only after a rabies blood test and a 180-day wait, followed by at least 10 days in quarantine.',
    sections: [
      { h: 'The 180-day clock', p: [
        'The wait starts on the date the rabies blood sample arrives at the laboratory, not the date it is drawn. Your dog must stay in an approved country for at least 180 days before export. It is not quarantine: your dog lives at home during this time.',
        'The test result is valid for 12 months from collection, so the export window runs from day 180 to about day 365.',
      ] },
      { h: '10 days or 30 days in quarantine', p: [
        'Group 3 dogs go to the government facility at Mickleham, Victoria. The minimum is 30 days, unless a government vet did an identity check before the blood draw, in which case it is 10 days. The check is optional but almost always worth it.',
      ] },
      { h: 'Start early', p: [
        'The Australian department of agriculture advises allowing at least 6 months for the whole process and recommends using an experienced pet transport agent.',
      ] },
    ],
    sources: [SRC.daffGuides, SRC.daffRabies, SRC.daffFaq, SRC.daffFees],
  },
  {
    slug: 'eu-2026-pet-travel-rules-uae',
    title: 'Bringing a dog from the UAE to the EU: 2026 rules',
    description: 'The EU\'s pet travel rules for dogs coming from the UAE under the 2026 regulations, in plain English.',
    route: 'EU',
    lead: 'The UAE is on the EU\'s list of countries exempt from the rabies blood test, so the route is straightforward: microchip, rabies vaccine, a 21-day wait and an EU animal health certificate. The legal basis changed in 2026, but the core rules for owners did not.',
    sections: [
      { h: 'What your dog needs', list: [
        'A microchip, implanted before the rabies vaccine.',
        'A rabies vaccine given at 12 weeks or older; it becomes valid 21 days after the primary vaccination.',
        'An EU animal health certificate issued by an official vet (or an authorised vet, then endorsed), used within 10 days of issue.',
        'A signed owner declaration that the move is non-commercial. You travel with your dog, or within 5 days of it.',
        'Entry through a designated travellers\' point of entry for document and ID checks.',
      ] },
      { h: 'Going to Finland, Ireland or Malta', p: [
        'Dogs also need a vet tapeworm treatment between 24 and 120 hours before entry, recorded on the certificate.',
      ] },
      { h: 'After you arrive', p: [
        'The certificate stays valid for onward travel to other EU countries for 6 months from the entry checks, or until the rabies vaccine expires, whichever is sooner.',
      ] },
    ],
    sources: [SRC.euEntry, SRC.euList],
  },
  {
    slug: 'uk-pet-health-certificate-tapeworm',
    title: 'UK entry from the UAE: health certificate and tapeworm timing',
    description: 'The two timed steps that trip up most dog moves from the UAE to Great Britain.',
    route: 'GB',
    lead: 'Two steps in a UK move have tight windows: the Great Britain pet health certificate must be issued within 10 days of arrival, and the dog\'s tapeworm treatment must be given between 1 and 5 days before arrival.',
    sections: [
      { h: 'Great Britain pet health certificate', list: [
        'Coming from the UAE, this is the document your dog needs; a pet passport or AHC is not accepted from listed countries like the UAE.',
        'It must be signed, stamped and dated by an official veterinarian.',
        'Your dog must enter Great Britain within 10 days of it being issued.',
      ] },
      { h: 'Tapeworm treatment', p: [
        'A vet must treat your dog no less than 24 hours and no more than 5 days before you arrive. Count back from the arrival time, not the departure time, especially on long or overnight routings.',
      ] },
      { h: 'Also needed', list: [
        'Microchip before rabies vaccine, and travel at least 21 days after the vaccine.',
        'A non-commercial declaration, and an approved route into Great Britain.',
      ] },
    ],
    sources: [SRC.govuk, SRC.govukDoc, SRC.govukCert],
  },
  {
    slug: 'microchip-before-rabies-vaccine',
    title: 'Why the microchip must go in before the rabies vaccine',
    description: 'The ordering rule that can invalidate a dog\'s rabies vaccine for travel, and how to check your dog\'s records.',
    lead: 'For the UK, the EU, the USA and New Zealand, a rabies vaccine given before the microchip does not count for travel. If that happened, your dog needs to be vaccinated again after chipping, and the waiting periods restart.',
    sections: [
      { h: 'What the rules say', table: { head: ['Destination', 'Rule'], rows: [
        ['United Kingdom', 'Pets must be microchipped before their rabies vaccination'],
        ['European Union', 'The vaccine date must not be earlier than the microchip date'],
        ['United States', 'Microchip implanted before the rabies vaccine, or the vaccine is invalid'],
        ['New Zealand', 'Microchip number verified and recorded at each vaccination and test'],
      ] } },
      { h: 'How to check your dog', list: [
        'Find the microchip implant date and the rabies vaccination date on your vet records.',
        'Check the microchip number on the vaccine record matches the chip.',
        'If the vaccine came first, ask your vet to revaccinate now and count the waiting periods from the new date.',
      ] },
    ],
    sources: [SRC.govuk, SRC.euEntry, SRC.cdcForeign, SRC.mpiIhs],
  },
];

export const UPDATED_AT = UPDATED;
export default articles;
