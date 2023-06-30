
export const create_discount=`mutation discountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
  discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
  codeDiscountNode{
    codeDiscount {
      ... on DiscountCodeBasic {
        endsAt
        codes(first: 10) {
          edges {
            node {
              code
            }
          }
        }
        customerGets {
          items {
            ... on AllDiscountItems {
              allItems
            }
          }
          value {
            ... on DiscountAmount {
             amount {
                amount
              }
          }
          ... on DiscountPercentage {
            percentage
          }
        }
        }
        customerSelection {
          ... on DiscountCustomerAll {
            allCustomers
          }
          }
        title
        startsAt
        usageLimit
      }
      }
    }
    userErrors {
      field
      code
      message
    }
  }
}`;

export const get_discount=`query {
  codeDiscountNodes(first:10) {
    nodes {
      id
      codeDiscount {
        ... on DiscountCodeBasic {
          title
          status
        }
      }
     
    }
  }
}`;

export const get_single_discount=`query {
  codeDiscountNode(id:gid://shopify/DiscountCodeNode/1394692653346) {
      id
      codeDiscount {
        ... on DiscountCodeBasic {
          title
          status
        }
      } 
  }
}`;

"uka3ft"


export const metaobject_defination=`mutation CreateMetaobjectDefinition($definition: MetaobjectDefinitionCreateInput!) {
  metaobjectDefinitionCreate(definition: $definition) {
    metaobjectDefinition {
      name
      type
      fieldDefinitions {
        name
        key
      }
    }
    userErrors {
      field
      message
      code
    }
  }
}`

export const get_metaobject_defination=`query {
    metaobjectDefinitions(first: 10) {
      edges {
        node {
          name
          type
          fieldDefinitions {
            name
            key
            type {
              name
            }
            validations {
              name
              value
          }
        }
      }
    }
  }
}`

export const update_metaobject_defination=`mutation UpdateMetaobjectDefinition($id: ID!, $definition: MetaobjectDefinitionUpdateInput!) {
  metaobjectDefinitionUpdate(id: $id, definition: $definition) {
    metaobjectDefinition {
      id
      access{
        storefront
      }
      capabilities{
        publishable{
          enabled
        }
      }
    }
    userErrors {
      field
      message
      code
    }
  }
}`;




export const metaobject=`mutation CreateMetaobject($metaobject: MetaobjectCreateInput!) {
  metaobjectCreate(metaobject: $metaobject) {
    metaobject {
      title: field(key: "title") {
        value
      }
      des: field(key: "des") {
        value
      }
      popup_bg: field(key: "popup_bg") {
        value
      }
      btn_text: field(key: "btn_text") {
        value
      }
      btn_bg: field(key: "btn_bg") {
        value
      }
      text_color: field(key: "text_color") {
        value
      }
      enable: field(key: "enable") {
        value
      }
    }
    userErrors {
      field
      message
      code
    }
  }
}`

export const get_metaobject=`query {
  metaobjects(first: 10, type: "popup") {
    edges {
      node {
        id
        handle
        fields {
          value
          key
        }
      }
    }
  }
}`


export const update_popup_metaobject=`mutation UpdateMetaobject($id: ID!, $metaobject: MetaobjectUpdateInput!) {
  metaobjectUpdate(id: $id, metaobject: $metaobject) {
    metaobject {
      handle
      title: field(key: "title") {
        value
      }
      des: field(key: "des") {
        value
      }
      popup_bg: field(key: "popup_bg") {
        value
      }
      btn_text: field(key: "btn_text") {
        value
      }
      btn_bg: field(key: "btn_bg") {
        value
      }
      text_color: field(key: "text_color") {
        value
      }
      enable: field(key: "enable") {
        value
      }

    }
    userErrors {
      field
      message
      code
    }
  }
}`


export const enable_popup_metaobject=`mutation UpdateMetaobject($id: ID!, $metaobject: MetaobjectUpdateInput!) {
  metaobjectUpdate(id: $id, metaobject: $metaobject) {
    metaobject {
      handle
      enable: field(key: "enable") {
        value
      }

    }
    userErrors {
      field
      message
      code
    }
  }
}`

export const get_single_metaobject=(id:string)=>{
  return(
  `query{
  metaobject(id:"gid://shopify/Metaobject/") {
    id
    fields {
      value
      key
    }
  }
}`)
}
export const delete_metaobject_fielddefination=`mutation UpdateMetaobjectDefinition($id: ID!, $definition: MetaobjectDefinitionUpdateInput!) {
  metaobjectDefinitionUpdate(id: $id, definition: $definition) {
    metaobjectDefinition {
      id
      name
      fieldDefinitions {
        name
        key
      }
    }
    userErrors {
      field
      message
      code
    }
  }
}`

export const delete_metaobject=`mutation DeleteMetaobject($id: ID!) {
  metaobjectDelete(id: $id) {
    deletedId
    userErrors {
      field
      message
      code
    }
  }
}`

export const delete_metaobject_defination=`mutation DeleteMetaobjectDefinition($id: ID!) {
  metaobjectDefinitionDelete(id: $id) {
    deletedId
    userErrors {
      field
      message
      code
    }
  }
}`

export const update_metaobject=`mutation UpdateMetaobject($id: ID!, $metaobject: MetaobjectUpdateInput!) {
  metaobjectUpdate(id: $id, metaobject: $metaobject) {
    metaobject {
      capabilities {
        publishable {
          status
        }
      }
    }
    userErrors {
      field
      message
      code
    }
  }
}`